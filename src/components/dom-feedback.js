export function domFeedback(contentContainer, message) {
  const feedbackDiv = document.createElement("div");
  const feedbackMessage = document.createElement("p");
  const dismissButton = document.createElement("button");
  feedbackDiv.classList.add("errorMessageContainer");
  feedbackMessage.textContent = message;
  dismissButton.textContent = "ok";
  feedbackDiv.appendChild(feedbackMessage);
  feedbackDiv.appendChild(dismissButton);
  contentContainer.appendChild(feedbackDiv);
}
