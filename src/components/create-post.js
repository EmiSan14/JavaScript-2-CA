import { apiPOST } from "../api/apiClient.js";
import { domFeedback } from "./dom-feedback.js";

export async function createPost(contentContainer, postTitle, postBody) {
  let apiResponse;
  if (!postBody) {
    apiResponse = await apiPOST("social/posts", postTitle);
  } else {
    apiResponse = await apiPOST("social/posts", postTitle, postBody);
  }
  if (apiResponse === "Title cannot be empty") {
    domFeedback(contentContainer, apiResponse);
  } else {
    domFeedback(contentContainer, "Post created");
  }
}
