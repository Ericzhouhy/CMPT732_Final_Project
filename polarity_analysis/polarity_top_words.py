import os
import argparse
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, explode, split, concat, lit, trim, lower, when, array, regexp_replace
from pyspark.ml.feature import StopWordsRemover

def main(input_path, output_path):
    spark = SparkSession.builder \
        .appName("Unigram Analysis") \
        .getOrCreate()

    spark.sparkContext.setLogLevel("ERROR")

    data_df = spark.read.csv(input_path, header=False).toDF("polarity", "title", "content")
    data_df = data_df.withColumn("polarity", col("polarity").cast("int") - 1)
    data_df = data_df.withColumn("text", lower(trim(concat(col("title"), lit(" "), col("content")))))
    data_df = data_df.withColumn("text", regexp_replace(col("text"), r"[^\w\s]", ""))
    data_df = data_df.withColumn("words", split(col("text"), " "))
    data_df = data_df.withColumn("words", when(col("words").isNull(), array()).otherwise(col("words")))

    remover = StopWordsRemover(inputCol="words", outputCol="filtered_words")
    data_df = remover.transform(data_df)

    def calculate_word_frequencies(df):
        exploded_words_df = df.select(explode(col("filtered_words")).alias("word"))
        word_counts_df = exploded_words_df.groupBy("word").count()
        return word_counts_df

    positive_word_counts_df = calculate_word_frequencies(data_df.filter(col("polarity") == 1)).withColumnRenamed("count", "pos_count")
    negative_word_counts_df = calculate_word_frequencies(data_df.filter(col("polarity") == 0)).withColumnRenamed("count", "neg_count")

    total_positive_reviews = data_df.filter(col("polarity") == 1).count()
    total_negative_reviews = data_df.filter(col("polarity") == 0).count()

    scaling_factor = total_positive_reviews / total_negative_reviews

    combined_word_counts_df = positive_word_counts_df.join(negative_word_counts_df, "word", "outer").fillna(0)

    combined_word_counts_df = combined_word_counts_df.withColumn("standard_neg_count", col("neg_count") * scaling_factor) \
                                                     .withColumn("standard_pos_diff", col("pos_count") - col("standard_neg_count")) \
                                                     .withColumn("standard_neg_diff", col("standard_neg_count") - col("pos_count"))

    top_positive_words_df = combined_word_counts_df.orderBy(col("standard_pos_diff").desc()).limit(10).select("word", "pos_count", "neg_count", "standard_pos_diff")

    top_negative_words_df = combined_word_counts_df.orderBy(col("standard_neg_diff").desc()).limit(10).select("word", "pos_count", "neg_count", "standard_neg_diff")

    top_positive_words_df.coalesce(1).write.mode("overwrite").csv(f"{output_path}/positive", header=True)
    top_negative_words_df.coalesce(1).write.mode("overwrite").csv(f"{output_path}/negative", header=True)

    spark.stop()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Unigram Analysis with Spark")
    parser.add_argument("--input", required=True, help="Input path for the train.csv file in HDFS")
    parser.add_argument("--output", required=True, help="Output path for the results in HDFS")

    args = parser.parse_args()

    main(args.input, args.output)
