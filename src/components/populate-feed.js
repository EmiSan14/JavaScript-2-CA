import { createDOMElement } from "../utils/create-dom-element.js";
import { createImage } from "../utils/create-image.js";

/**
 * Takes api-data and makes a visual post for every item
 * to be appended to a container on the page
 * @param {HTMLElement} domElement - A container to hold all posts
 * @param {Array} apiData - fetched data of posts from api
 */
export function populateFeed(domElement, apiData) {
  apiData.forEach((post) => {
    const postContainer = document.createElement("article");
    postContainer.classList.add("singlePost");
    const postTitle = createDOMElement("h2", post.title);
    const postBody = createDOMElement("p", post.body);
    const postMoreButton = createDOMElement("a", "more");
    postMoreButton.dataset.id = post.id;
    postMoreButton.classList.add("postMoreButton");
    postMoreButton.setAttribute("href", "./individual-post/index.html");
    postContainer.appendChild(postTitle);
    postContainer.appendChild(postBody);
    if (post.media) {
      const postImage = createImage(post.media);
      postContainer.appendChild(postImage);
    }
    postContainer.appendChild(postMoreButton);
    domElement.appendChild(postContainer);
  });
}
