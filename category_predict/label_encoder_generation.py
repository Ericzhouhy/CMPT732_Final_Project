import pickle
from sklearn.preprocessing import LabelEncoder
import pandas as pd

# Example dataset to recreate LabelEncoder (replace with your actual dataset)
df = pd.read_csv("../cleaned_data/category_rating.csv")  # Use the same dataset used during training
categories = df["category_name"].unique()

# Fit the LabelEncoder
label_encoder = LabelEncoder()
label_encoder.fit(categories)

# Save the LabelEncoder
with open("../category_predict/label_encoder.pkl", "wb") as le_file:
    pickle.dump(label_encoder, le_file)

print("LabelEncoder saved as label_encoder.pkl")