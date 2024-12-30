import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from collections import Counter
import tarfile

data_path = '/Users/ericz/Desktop/CMPT 732/CMPT732_ALLIN/raw_data/amazon_review_polarity_csv.tgz'
with tarfile.open(data_path, 'r:gz') as tar:
    tar.extractall(path='/Users/ericz/Desktop/CMPT 732/CMPT732_ALLIN/raw_data/')
    extracted_file = '/Users/ericz/Desktop/CMPT 732/CMPT732_ALLIN/raw_data/train.csv'

data = pd.read_csv(extracted_file, header=None, names=['polarity', 'title', 'content'])

# Convert polarity values: 2 (positive) -> 1, 1 (negative) -> 0
data['polarity'] = data['polarity'].map({2: 1, 1: 0})

data['text'] = (data['title'].fillna('') + ' ' + data['content'].fillna('')).str.strip()

X = data['text']
y = data['polarity']

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Vectorize the text data
vectorizer = TfidfVectorizer(stop_words='english', max_df=0.95, min_df=5)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

model = LogisticRegression()
model.fit(X_train_vec, y_train)

y_pred = model.predict(X_test_vec)

accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.2f}')
print('\nClassification Report:\n', classification_report(y_test, y_pred))

conf_matrix = confusion_matrix(y_test, y_pred)
print('\nConfusion Matrix:\n', conf_matrix)

coefficients = model.coef_[0]
feature_names = vectorizer.get_feature_names_out()

# Pair them up and sort by absolute value of coefficients
feature_importance = sorted(zip(feature_names, coefficients), key=lambda x: abs(x[1]), reverse=True)



