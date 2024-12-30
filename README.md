# CMPT732_ALLIN
CMPT732_ALLIN Project 2024 Fall

# Predicting Reviews Ratings and Categories: A Comparative Study of Amazon and Temu
Project video URL: https://www.youtube.com/watch?v=8L51nrv5HsU
---
## Environment Setup
We have set up a requirement file, please navigate to your terminal, activate conda or other virtual environment if you like (unless you want to install dependencies in your OS environment which is not recommanded), run the following code.
`pip install -r requirements.txt`

---

## How to use

### Quick Starter

## Try it from Web
Our project consolidates group members introduction, timeline, experimental results and model predictions into a comprehensive web interface for easy access and analysis. 

Follow the steps below to use the application:
This project contains both a **Next.js frontend (my-app)** and a **FastAPI backend**. Follow the instructions below to set up and run the project.
### Prerequisites
- **Node.js** (v20.15.0 recommended)
- **Python** (v3.11.7 recommended)
- **fastapi** (v0.111.0)
### Cloning the Repository

First, clone the repository from GitHub and navigate to the project directory:

`git clone git@github.sfu.ca:lingjiel/CMPT732_ALLIN.git`

`cd CMPT732_ALLIN/website`

### Create a Virtual Environment for backend
`cd backend`

`python3 -m venv fastapienv`

`source fastapienv/bin/activate`

### Install Dependencies for front-end(my-app)
`cd my-app`

`npm install` 

users can check "my-app/package.json" to know which packages be used in this website.

### Running the whole project
`cd my-app`

`npm run dev` (It will run both front-end and back-end)


## Try it from Scratch
Since we kept all the original dataset in the **raw_data/** folder. We can start our journey from cleaning data with original dataset.

**Working Flow:**

- Run *clean_code/amazon_product_clean.ipynb*
- Run *clean_code/temu_dataset_clean.py*

**Data analysis && Visulizasion:**

- Run *visualization_code/amazon_product_visualization.ipynb*
- Run *category_predict/category_trainplot.py*
- Run *polarity_analysis/polarity_predict.py*
- Run *polarity_analysis/polarity_top_words.py*
- Run *polarity_analysis/polarity_top_bigrams.py*
- Run *polarity_analysis/polarity_top_trigrams.py*

**Model Accuracy:**

- Run *category_predict/amazon_category_predict.ipynb*
- Run *rating_predict/amazon_rating_predict.ipynb*

**Model Prediction:**

- Run *category_predict/category_predict.py.ipynb*
- Run *rating_predict/rating_predict.ipynb*
- Run *rating_predict/rating_predict.py*

---

## File explanation 
| File Path & Name|Description |
| ----------- | ----------- |
| Root -> requirements.txt | Environment file. |
| Root -> website/ | Web page showing the project(See instuctions). |
| raw_data -> reviews.csv | Originial data for predicting rating. |
| raw_data -> amazon_categories.csv | Amazon category ID corresponding to category name. |
| raw_data -> amazon_products.csv | Amazon products raw data. |
| raw_data -> amazon_review_polarity_csv.tgz | Amazon reviews raw data. |
| raw_data -> temu_product_sales_dataset.csv | Temu products raw data. |
| raw_data -> train.csv | Amazon product data for training. |
| raw_data -> test.csv | Amazon product data for testing. |
| cleaned_data -> amazon_categories.csv | Cleaned data including product IDs and category names. |
| cleaned_data -> amazon_product_cleaned.csv | Cleaned product basic information. |
| cleaned_data -> category_rating.csv | Cleaned data mapping product names and categories for machine learning. |
| cleaned_data -> cleaned_temu_dataset.csv | Cleaned Temu product data for analysis. |
| cleaned_code -> amazon_product_clean.ipynb | Script for amazon product dataset cleaning. |
| cleaned_code -> temu_dataset_clean.py | Script for temu product dataset cleaning. |
| visualization_code -> amazon_product_visualization.ipynb | Script for data visualization. |
| rating_predict -> amazon_rating_predict.ipynb | Jupyter notebook for model selection and accuracy evaluation. |
| rating_predict -> rating_predict.ipynb | Jupyter notebook model prediction. |
| rating_predict -> rating_predict.py | Python script for model prediction (likely for deployment or API). |
| rating_predict -> rating_model.joblib | Serialized (saved) machine learning model for predicting ratings. |
| category_predict -> amazon_category_predict.ipynb | Jupyter notebook for model selection and accuracy evaluation for category prediction. |
| category_predict -> category_model_test.py | Script for training and saving the category prediction model. |
| category_predict -> category_predict.py | Script for model prediction (category classification). |
| category_predict -> category_predict_model/ | Directory for storing saved models. |
| category_predict -> label_encoder_generation.py | Script for generating a label encoder used in the category classification. |
| category_predict -> label_encoder.pkl | Serialized label encoder for category names. |
| category_predict -> category_trainplot.py | Script for ploting the loss curve for model learning. |
| category_predict -> training_logs.json | Json file for saving the training process. |
| polarity_analysis -> polarity_predict.py | Python script for creating Logistic Regression model. |
| polarity_analysis -> polarity_top_bigrams.py | Spark script for top bigrams. |
| polarity_analysis -> polarity_top_words.py | Spark script for top words. |
| polarity_analysis -> polarity_top_trigrams.py | Spark script for top trigrams. |
| polarity_analysis -> polarity_result | Results of the top words, bigrams, trigrams. |
| Results | Visualization results. |

---

## Project Results
This project analyzed **Amazon** and **Temu** datasets to derive insights and solve business problems using **data visualization**, **natural language processing (NLP)**, and **machine learning (ML)** techniques.

---

### Key Challenges
- Aligning category structures between datasets.
- Efficiently handling large-scale datasets.
- Building accurate and robust predictive models.

---

### Solutions
1. **Data Visualization**:  
   - Used histograms and scatter plots to identify and compare patterns across datasets.

2. **Category Alignment**:  
   - Applied fuzzy matching techniques to align categories between platforms.  
   - Refined manual categorization iteratively to improve analysis accuracy.

3. **Scalable Data Processing**:  
   - Addressed out-of-memory issues by transitioning to **Apache Spark** and **HDFS**, enabling distributed processing for large datasets.

4. **Predictive Modeling**:  
   - Preprocessed data with tokenization and n-gram extraction.  
   - Built models:
     - **Random Forest** for customer review ratings.  
     - **Fine-tuned facebook/bart-base** for product categories.

---

### Results
1. **Customer Review Ratings**:  
   - **Model**: Random Forest  
   - **Accuracy**: 0.7711  

2. **Product Categories**:  
   - **Model**: Fine-tuned facebook/bart-base  
   - **Accuracy**: 0.8421  

---

### Key Takeaways
1. Scalable tools like **Apache Spark** are essential for processing large datasets.  
2. Preprocessing techniques and fine-tuning of **ML** models and **neural network** techniques significantly improve accuracy.  
3. Insights from customer reviews and product categories highlight the effectiveness of combining **distributed systems** with machine learning.

