import os
import argparse
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, explode, split, concat, lit, trim, lower, count, array, expr, abs, size, when, regexp_replace
from pyspark.ml.feature import StopWordsRemover

def main(input_path, output_path):
    spark = SparkSession.builder \
        .appName("Bigram Analysis") \
        .getOrCreate()

    spark.sparkContext.setLogLevel("ERROR")
    data_df = spark.read.csv(input_path, header=False).toDF("polarity", "title", "content")
    data_df = data_df.repartition(200)
    data_df = data_df.withColumn("polarity", col("polarity").cast("int") - 1)

    data_df = data_df.withColumn("text", lower(trim(concat(col("title"), lit(" "), col("content")))))
    data_df = data_df.withColumn("text", regexp_replace(col("text"), r"[^\w\s]", ""))
    data_df = data_df.withColumn("words", split(col("text"), " "))
    data_df = data_df.withColumn("words", when(col("words").isNull(), array()).otherwise(col("words")))

    # Remove stop words
    remover = StopWordsRemover(inputCol="words", outputCol="filtered_words")
    data_df = remover.transform(data_df)

    def calculate_bigram_frequencies(df):
        bigrams_df = df.select(
            explode(expr("transform(sequence(0, size(filtered_words) - 2), x -> array(filtered_words[x], filtered_words[x+1]))")).alias("bigram")
        )
        bigrams_df = bigrams_df.withColumn("bigram", concat(col("bigram").getItem(0), lit(" "), col("bigram").getItem(1)))
        bigram_counts_df = bigrams_df.groupBy("bigram").count()
        return bigram_counts_df

    positive_bigram_counts_df = calculate_bigram_frequencies(data_df.filter(col("polarity") == 1)).withColumnRenamed("count", "pos_count")
    negative_bigram_counts_df = calculate_bigram_frequencies(data_df.filter(col("polarity") == 0)).withColumnRenamed("count", "neg_count")

    pos_total = data_df.filter(col("polarity") == 1).count()
    neg_total = data_df.filter(col("polarity") == 0).count()

    combined_bigram_counts_df = positive_bigram_counts_df.join(negative_bigram_counts_df, "bigram", "outer").fillna(0)

    combined_bigram_counts_df = combined_bigram_counts_df.withColumn("normalized_neg_count", col("neg_count") * pos_total / neg_total)

    combined_bigram_counts_df = combined_bigram_counts_df.withColumn("difference", col("pos_count") - col("normalized_neg_count"))

    min_frequency = 5
    filtered_bigrams_df = combined_bigram_counts_df.filter((col("pos_count") >= min_frequency) | (col("normalized_neg_count") >= min_frequency))

    top_positive_bigrams_df = filtered_bigrams_df.orderBy(col("difference").desc()).limit(10).select("bigram", "pos_count", "normalized_neg_count", "difference")
    top_negative_bigrams_df = filtered_bigrams_df.orderBy(col("difference").asc()).limit(10).select("bigram", "pos_count", "normalized_neg_count", "difference")

    top_positive_bigrams_df.coalesce(1).write.mode("overwrite").csv(f"{output_path}/positive", header=True)
    top_negative_bigrams_df.coalesce(1).write.mode("overwrite").csv(f"{output_path}/negative", header=True)

    spark.stop()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Bigram Analysis with Spark")
    parser.add_argument("--input", required=True, help="Input path for the train.csv file in HDFS")
    parser.add_argument("--output", required=True, help="Output path for the results in HDFS")

    args = parser.parse_args()

    main(args.input, args.output)
