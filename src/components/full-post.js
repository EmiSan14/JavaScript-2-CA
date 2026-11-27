import { createDOMElement } from "../utils/create-dom-element.js";
import { createImage } from "../utils/create-image.js";

export function createFullPost(container, post) {
  const postTitle = createDOMElement("h2", post.title);
  const postBody = createDOMElement("p", post.body);
  const postTagsDiv = document.createElement("div");
  const postTags = post.tags;
  postTags.forEach((tag) => {
    const tagP = createDOMElement("p", tag);
    postTagsDiv.appendChild(tagP);
  });
  const postCreated = createDOMElement("p", `Created at: ${post.created}`);
  const postUpdated = createDOMElement("p", `Last updated: ${post.updated}`);
  container.appendChild(postTitle);
  if (post.media) {
    const postImage = createImage(post.media);
    container.appendChild(postImage);
  }
  container.appendChild(postBody);
  container.appendChild(postCreated);
  container.appendChild(postUpdated);
}
