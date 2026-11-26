import { apiPOST } from "../api/apiClient.js";
import { domFeedback } from "./dom-feedback.js";

export function createPost(contentContainer, postTitle, postBody) {
  if (!postBody) {
    const apiResponse = apiPOST("social/posts", postTitle);
  } else {
    const apiResponse = apiPOST("social/posts", postTitle, postBody);
  }
  domFeedback(contentContainer, "Post created");
}
