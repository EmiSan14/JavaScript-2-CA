import { apiPOST } from "../api/apiClient.js";
import { domFeedback } from "./dom-feedback.js";

/**
 * Creates a new post to api through POST method and the title/body
 * values written on the page through <input>. It then uses domFeedback() function
 * to show visual feedback to user that a post was created or failed
 * @param {HTMLElement} contentContainer - Container to append feedback to
 * @param {string} postTitle - The value from an input that will be the created post's title
 * @param {string} postBody - The value from an input that will be the created post's body
 */
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
