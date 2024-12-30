
# "dev": "next dev",
#     texts = [
#         "This is a great product for traveling!",  # Example input text
#         "I didn't like this product at all.",      # Example input text
#     ]


from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
import pickle
import os

# Load the trained model and tokenizer
model_path = "./category_predict_model"  # Path to your saved model

try:
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    tokenizer = AutoTokenizer.from_pretrained(model_path)
except Exception as e:
    raise RuntimeError(f"Failed to load model or tokenizer from {model_path}: {e}")

# Load the saved LabelEncoder
label_encoder_path = "label_encoder.pkl"
if not os.path.exists(label_encoder_path):
    raise FileNotFoundError(
        f"Label encoder file not found at {label_encoder_path}. Ensure it was saved during training.")

with open(label_encoder_path, "rb") as le_file:
    label_encoder = pickle.load(le_file)


# Define the function to make predictions
def predict(texts):
    """
    Predict categories for input text(s).

    Args:
        texts (str or list of str): The input text(s) for prediction.

    Returns:
        list of str: Predicted category names.
    """
    # 如果传入的是字符串，而不是列表，将其包装为单个元素的列表
    if isinstance(texts, str):
        texts = [texts]
    elif not isinstance(texts, list) or not all(isinstance(t, str) for t in texts):
        raise ValueError("Input must be a string or a list of strings.")

    # 之后的逻辑不变
    inputs = tokenizer(
        texts,
        padding=True,
        truncation=True,
        max_length=128,
        return_tensors="pt"
    )

    model.eval()

    with torch.no_grad():
        outputs = model(**inputs)

    logits = outputs.logits
    predicted_indices = torch.argmax(logits, dim=-1).tolist()

    try:
        predicted_categories = label_encoder.inverse_transform(predicted_indices)
    except Exception as e:
        raise RuntimeError(f"Failed to map indices to category names: {e}")

    return predicted_categories



