import os
from joblib import load

model_pipeline = None

# 获取当前脚本的目录
current_directory = os.path.dirname(__file__)
# 构造模型文件的绝对路径
model_path = os.path.join(current_directory, 'rating_model.joblib')


def load_model():
    """
    Load the trained model pipeline if it hasn't been loaded yet.
    """
    global model_pipeline
    if model_pipeline is None:
        try:
            model_pipeline = load(model_path)
            print("Model successfully loaded.")
        except Exception as e:
            raise RuntimeError(f"Failed to load the model: {e}")


def predict_rating(text: str):
    """
    Predict the rating for the given input text.

    Args:
        text (str): The review text for prediction.

    Returns:
        int/float: Predicted rating.
    """
    if model_pipeline is None:
        load_model()

    # 使用输入的文本进行预测
    predicted_rating = model_pipeline.predict([text])
    return predicted_rating[0]
