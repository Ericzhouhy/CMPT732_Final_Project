from joblib import load

# Load the trained pipeline (model + preprocessing)
model_pipeline = load('../rating_predict/rating_model.joblib')

# New review for prediction
new_review1 = ["This is a great product!"]
new_review2 = ["Cough Medicine"]

# Directly predict using the pipeline
predicted_rating1 = model_pipeline.predict(new_review1)
predicted_rating2 = model_pipeline.predict(new_review2)

# Print the result
print(f"Predicted Rating: {predicted_rating1[0]}")
print(f"Predicted Rating: {predicted_rating2[0]}")
