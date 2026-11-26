// Create container and button to display and
// dismiss error/success message
export function domFeedback(contentContainer, message) {
  const feedbackDiv = document.createElement("div");
  const feedbackMessage = document.createElement("p");
  const dismissButton = document.createElement("button");
  if (message === "Login successful" || message === "Post created") {
    feedbackDiv.classList.add("successMessageContainer");
  } else {
    feedbackDiv.classList.add("errorMessageContainer");
  }

  feedbackMessage.textContent = message;
  dismissButton.textContent = "ok";
  feedbackDiv.appendChild(feedbackMessage);
  feedbackDiv.appendChild(dismissButton);
  contentContainer.appendChild(feedbackDiv);
  dismissButton.addEventListener("click", () => {
    feedbackDiv.remove();
  });
}
