from transformers import AutoModelForSequenceClassification, AutoTokenizer, Trainer, TrainingArguments, DataCollatorWithPadding
from datasets import Dataset
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Load CSV and encode labels
df = pd.read_csv("./cleaned_data/category_rating.csv")

# Encode category names into numerical labels
label_encoder = LabelEncoder()
df['labels'] = label_encoder.fit_transform(df['category_name'])

# Convert the DataFrame to a Hugging Face Dataset
dataset = Dataset.from_pandas(df)

# Load the model and tokenizer
model_name = "facebook/bart-base"  # Use a smaller version of the model for resource efficiency
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Load the model, handling mismatched sizes
model = AutoModelForSequenceClassification.from_pretrained(
    model_name,
    num_labels=len(label_encoder.classes_),  # Match the number of output classes
    ignore_mismatched_sizes=True  # Allow loading despite size mismatches
)

# Reinitialize the classification head to match the correct number of classes
from transformers import BartForSequenceClassification

model.classification_head = BartForSequenceClassification.from_pretrained(
    model_name,
    num_labels=len(label_encoder.classes_)
).classification_head

# Define preprocessing function
def preprocess_function(examples):
    tokenized = tokenizer(
        examples["product"],  # Replace "product" with the column for input text
        padding="max_length",
        truncation=True
    )
    tokenized["labels"] = examples["labels"]
    return tokenized

# Preprocess the dataset
tokenized_datasets = dataset.map(preprocess_function, batched=True)

# Split into training and evaluation datasets
train_test_split = tokenized_datasets.train_test_split(test_size=0.2)
train_dataset = train_test_split["train"]
eval_dataset = train_test_split["test"]

# Use a data collator for padding
data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

# Define training arguments
training_args = TrainingArguments(
    output_dir="./results",
    eval_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=2,  # Reduce batch size for memory efficiency
    gradient_accumulation_steps=8,  # Simulate a larger batch size
    num_train_epochs=3,
    weight_decay=0.01,
    save_strategy="epoch",
    use_cpu=True,  # Explicitly set to CPU if GPU is unavailable
)

# Create the Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    tokenizer=tokenizer,
    data_collator=data_collator,
)

# Train the model
trainer.train()

import json

with open("../category_predict/training_logs.json", "w") as log_file:
    json.dump(trainer.state.log_history, log_file)
# Save the fine-tuned model
trainer.save_model("./category_predict/category_predict_model")
