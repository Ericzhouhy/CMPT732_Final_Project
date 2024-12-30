import pandas as pd
import numpy as np
import os

# Load data from CSV file
def load_data(filepath):
    """
    Load data from a CSV file and display the first 10 rows.
    """
    df = pd.read_csv(filepath)
    print(df.head(10))
    return df

# Check for missing values in the DataFrame
def check_missing_values(df):
    """
    Check and print missing values per column.
    """
    missing_values = df.isnull().sum()
    print("Missing values per column:\n", missing_values)

# Clean the DataFrame by filling missing values, converting types, and extracting information
def clean_data(df):
    """
    Clean the DataFrame by filling missing values, converting data types, and extracting numeric parts from strings.
    """
    # Fill missing values
    df['sales_info'].fillna(0, inplace=True)
    df['sales_volume'].fillna(0, inplace=True)
    df['price'].fillna(0, inplace=True)
    df['comment_num'].fillna(0, inplace=True)

    # Drop rows with missing values in goods_score
    df.dropna(subset=['goods_score'], inplace=True)

    # Convert other numeric columns to numeric types
    df['sales_volume'] = pd.to_numeric(df['sales_volume'], errors='coerce')
    df['goods_score'] = pd.to_numeric(df['goods_score'], errors='coerce')
    df['comment_num'] = pd.to_numeric(df['comment_num'], errors='coerce')

    # Extract numeric part from sales_info and convert to integer
    df['sales_info'] = df['sales_info'].str.replace(',', '').str.extract(r'(\d+)').fillna(0).astype(int)

    return df


# Create new columns and select the required columns
def create_columns(df):
    """
    Create new columns by combining existing columns and selecting specific columns for the cleaned DataFrame.
    """
    # Combine leve_1_category_id and leve_2_category_id into main_category_id
    df['main_category_id'] = df['leve_1_category_id'].astype(
        str) + '-' + df['leve_2_category_id'].astype(str)

    # Create a cleaned DataFrame with only required columns
    df_cleaned = df[['main_category_id','leve_1_category_name','leve_2_category_name', 'title', 'sales_info',
                     'sales_volume', 'price', 'goods_score', 'comment_num']].copy()

    return df_cleaned

# Save the cleaned DataFrame to a CSV file
def save_data(df_cleaned, output_filepath):
    """
    Save the cleaned DataFrame to a CSV file.
    """
    df_cleaned.to_csv(output_filepath, index=False)
    print("Cleaned data saved to:", output_filepath)


if __name__ == "__main__":
    # Define file paths
    current_dir = os.path.dirname(os.path.abspath(__file__))

    input_filepath = os.path.join(current_dir, "../raw_data/temu_product_sales_dataset.csv")
    output_filepath = os.path.join(current_dir, "../cleaned_data/cleaned_temu_dataset.csv")

    # Load and inspect data
    df = load_data(input_filepath)
    check_missing_values(df)

    # Clean data
    df_cleaned = clean_data(df)

    # Create additional columns and clean up
    df_cleaned = create_columns(df_cleaned)

    # Save cleaned data
    save_data(df_cleaned, output_filepath)
