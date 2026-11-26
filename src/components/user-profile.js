import { createDOMElement } from "../utils/create-dom-element.js";
import { createImage } from "../utils/create-image.js";

export function createUserProfile(container, userProfile) {
  const profileName = createDOMElement("p", userProfile.name);
  const profileEmail = createDOMElement("p", userProfile.email);
  const profileBio = createDOMElement("p", userProfile.bio);
  const profileAvatar = createImage(userProfile.avatar);
  const profileBanner = createImage(userProfile.banner);
  profileAvatar.classList.add("profileAvatar");
  profileBanner.classList.add("profileBanner");
  container.appendChild(profileBanner);
  container.appendChild(profileAvatar);
  container.appendChild(profileName);
  container.appendChild(profileEmail);
  container.appendChild(profileBio);
}
