import { createDOMElement } from "../utils/create-dom-element.js";
import { createImage } from "../utils/create-image.js";

export function createUserProfile(container, userProfile) {
  const profileName = createDOMElement("p", userProfile.name);
  const profileEmail = createDOMElement("p", userProfile.email);
  const profileBio = createDOMElement("p", userProfile.bio);
  const profileAvatar = createImage(userProfile.avatar);
  profileAvatar.classList.add("profileAvatar");
  const profileBanner = createImage(userProfile.banner);
  profileBanner.classList.add("profileBanner");
  container.appendChild(profileBanner);
  container.appendChild(profileAvatar);
  container.appendChild(profileName);
  container.appendChild(profileEmail);
  container.appendChild(profileBio);
}

export function profilePosts(container, userPost) {
  const postTitle = createDOMElement("h3", userPost.title);
  const postBody = createDOMElement("p", userPost.body);
  const postID = userPost.id;
  container.dataset.id = postID;
  if (userPost.media) {
    const postImage = createImage(userPost.media);
    container.appendChild(postImage);
  }
  container.appendChild(postTitle);
  container.appendChild(postBody);
}
