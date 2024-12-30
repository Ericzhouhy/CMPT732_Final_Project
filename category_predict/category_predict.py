from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
import pickle
import os

# Load the trained model and tokenizer
model_path = "./category_predict/category_predict_model"  # Path to your saved model

try:
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    tokenizer = AutoTokenizer.from_pretrained(model_path)
except Exception as e:
    raise RuntimeError(f"Failed to load model or tokenizer from {model_path}: {e}")

# Load the saved LabelEncoder
label_encoder_path = "./category_predict/label_encoder.pkl"
if not os.path.exists(label_encoder_path):
    raise FileNotFoundError(f"Label encoder file not found at {label_encoder_path}. Ensure it was saved during training.")

with open(label_encoder_path, "rb") as le_file:
    label_encoder = pickle.load(le_file)

# Define the function to make predictions
def predict(texts):
    """
    Predict categories for a list of input texts.

    Args:
        texts (list of str): The input texts for prediction.

    Returns:
        list of str: Predicted category names.
    """
    if not isinstance(texts, list) or not all(isinstance(t, str) for t in texts):
        raise ValueError("Input must be a list of strings.")

    # Preprocess the input text
    inputs = tokenizer(
        texts,
        padding=True,
        truncation=True,
        max_length=128,  # Adjust based on your dataset preprocessing
        return_tensors="pt"  # Return PyTorch tensors
    )
    
    # Put the model in evaluation mode
    model.eval()
    
    # Perform inference
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Get the predicted class indices
    logits = outputs.logits
    predicted_indices = torch.argmax(logits, dim=-1).tolist()
    
    # Convert class indices to category names
    try:
        predicted_categories = label_encoder.inverse_transform(predicted_indices)
    except Exception as e:
        raise RuntimeError(f"Failed to map indices to category names: {e}")
    
    return predicted_categories

# Example usage
if __name__ == "__main__":
    texts = [
        "nike shoes", 
        "girl's pants", 
        "the north face fleece",
        "lululemon",
        "vietamin B",
        "kidchen aid"
    ]
    
    try:
        # Get predictions
        predicted_categories = predict(texts)
        print("Predicted categories:", predicted_categories)
    except Exception as e:
        print(f"Error during prediction: {e}")
