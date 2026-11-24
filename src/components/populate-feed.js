import { createDOMElement } from "../utils/create-dom-element.js";
import { createImage } from "../utils/create-image.js";

export function populateFeed(domElement, apiData) {
  apiData.forEach((post) => {
    const postContainer = document.createElement("article");
    const postTitle = createDOMElement("h2", post.title);
    const postBody = createDOMElement("p", post.body);
    postContainer.appendChild(postTitle);
    postContainer.appendChild(postBody);
    if (post.media) {
      const postImage = createImage(post.media);
      postContainer.appendChild(postImage);
    }
    domElement.appendChild(postContainer);
  });
}
