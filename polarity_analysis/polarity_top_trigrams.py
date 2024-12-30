import argparse
import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, explode, split, concat, lit, trim, lower, array, expr, size, when, regexp_replace
from pyspark.ml.feature import StopWordsRemover

def main(input_path, output_path):
    spark = SparkSession.builder \
        .appName("Trigram Analysis") \
        .config("spark.executor.memory", "4g") \
        .config("spark.driver.memory", "4g") \
        .config("spark.sql.shuffle.partitions", "500") \
        .getOrCreate()

    spark.sparkContext.setLogLevel("ERROR")

    data_df = spark.read.csv(input_path, header=False).toDF("polarity", "title", "content")
    data_df = data_df.repartition(200)
    data_df = data_df.withColumn("polarity", col("polarity").cast("int") - 1)
    data_df = data_df.withColumn("text", lower(trim(concat(col("title"), lit(" "), col("content")))))
    data_df = data_df.withColumn("text", regexp_replace(col("text"), r"[^\w\s]", ""))
    data_df = data_df.withColumn("words", split(col("text"), " "))

    data_df = data_df.withColumn("words", when(col("words").isNull(), array()).otherwise(col("words")))

    remover = StopWordsRemover(inputCol="words", outputCol="filtered_words")
    data_df = remover.transform(data_df)

    def calculate_trigram_frequencies(df):
        trigrams_df = df.select(
            explode(expr("transform(sequence(0, size(filtered_words) - 3), x -> array(filtered_words[x], filtered_words[x+1], filtered_words[x+2]))")).alias("trigram")
        )
        trigrams_df = trigrams_df.withColumn("trigram", concat(col("trigram").getItem(0), lit(" "), col("trigram").getItem(1), lit(" "), col("trigram").getItem(2)))
        trigram_counts_df = trigrams_df.groupBy("trigram").count()
        return trigram_counts_df

    positive_trigram_counts_df = calculate_trigram_frequencies(data_df.filter(col("polarity") == 1)).withColumnRenamed("count", "pos_count")
    negative_trigram_counts_df = calculate_trigram_frequencies(data_df.filter(col("polarity") == 0)).withColumnRenamed("count", "neg_count")

    pos_total = data_df.filter(col("polarity") == 1).count()
    neg_total = data_df.filter(col("polarity") == 0).count()

    combined_trigram_counts_df = positive_trigram_counts_df.join(negative_trigram_counts_df, "trigram", "outer").fillna(0)

    combined_trigram_counts_df = combined_trigram_counts_df.withColumn("normalized_neg_count", col("neg_count") * pos_total / neg_total)

    combined_trigram_counts_df = combined_trigram_counts_df.withColumn("difference", col("pos_count") - col("normalized_neg_count"))

    min_frequency = 5
    filtered_trigrams_df = combined_trigram_counts_df.filter((col("pos_count") >= min_frequency) | (col("normalized_neg_count") >= min_frequency))

    top_positive_trigrams_df = filtered_trigrams_df.orderBy(col("difference").desc()).limit(10).select("trigram", "pos_count", "normalized_neg_count", "difference")

    top_negative_trigrams_df = filtered_trigrams_df.orderBy(col("difference").asc()).limit(10).select("trigram", "pos_count", "normalized_neg_count", "difference")

    top_positive_trigrams_df.coalesce(1).write.mode("overwrite").csv(os.path.join(output_path, "positive"), header=True)
    top_negative_trigrams_df.coalesce(1).write.mode("overwrite").csv(os.path.join(output_path, "negative"), header=True)

    spark.stop()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Trigram Analysis with Spark")
    parser.add_argument("--input", required=True, help="Input path for the train.csv file")
    parser.add_argument("--output", required=True, help="Output path for the results")

    args = parser.parse_args()

    main(args.input, args.output)
