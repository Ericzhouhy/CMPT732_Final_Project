import json
import matplotlib.pyplot as plt

# Load training logs
with open("../category_predict/training_logs.json", "r") as log_file:
    training_logs = json.load(log_file)

# Extract training and evaluation losses
train_losses = [log["loss"] for log in training_logs if "loss" in log]
eval_losses = [log["eval_loss"] for log in training_logs if "eval_loss" in log]
epochs = range(1, len(train_losses) + 1)

# Plot the loss curves
plt.figure(figsize=(10, 6))
plt.plot(epochs, train_losses, label="Training Loss", marker='o')
if eval_losses:
    eval_epochs = range(1, len(eval_losses) + 1)
    plt.plot(eval_epochs, eval_losses, label="Evaluation Loss", marker='o')

# Add labels, title, legend, and grid
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.title("Training and Evaluation Loss Curve")
plt.legend()
plt.grid(True)

# Save the plot to a file
plt.savefig("../Results/loss_curve.png", format="png", dpi=300)  # Saves the plot as a high-resolution PNG file

# Show the plot
plt.show()
