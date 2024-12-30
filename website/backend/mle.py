from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import category_predict
import rating_predict
import numpy as np

app = FastAPI()

# 允许来自所有源的跨域请求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 你可以指定特定的域名，例如 ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# new_review1 = ["This is a great product!"]
# new_review2 = ["Cough Medicine"]

@app.get("/predict_rating/{text}")
def predict_rating_endpoint(text: str):
    try:
        # 调用 rating_predict 模块中的 predict_rating 函数
        result = rating_predict.predict_rating(text)

        # 如果结果是 numpy 类型，则将其转换为 Python 原生类型
        if isinstance(result, np.generic):
            result = result.item()

        #return {"predicted_rating": result}
        return result
    except Exception as e:
        # 如果发生错误，返回错误信息
        return {"error": str(e)}

@app.get("/predict_category/{text}")
def predict_category_endpoint(text: str):
    try:
        # 调用 category_predict 模块中的 predict 函数，传入单个文本
        result = category_predict.predict([text])  # 注意这里传入的参数是列表形式

        # 因为 predict 返回的是列表，即使只传递一个文本
        if len(result) == 1:
            result = result[0]

        # 如果结果是 numpy 类型，将其转换为 Python 原生类型
        if isinstance(result, np.generic):
            result = result.item()

        return result
    except Exception as e:
        # 如果发生错误，返回错误信息
        return {"error": str(e)}


