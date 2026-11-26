import { apiFetch } from "./api/apiClient.js";
import { createUserProfile, profilePosts } from "./components/user-profile.js";
import { domFeedback } from "./components/dom-feedback.js";
import { populateFeed } from "./components/populate-feed.js";
import { createDOMElement } from "./utils/create-dom-element.js";

const profilesPage = document.getElementById("profilesPage");
const profilesContainer = document.getElementById("profilesContainer");
const searchedProfileContainer = document.getElementById("searchedProfile");
const profilesSearch = document.getElementById("profilesSearch");
const profileSearchSubmit = document.getElementById("profileSearchSubmit");

profileSearchSubmit.addEventListener("click", async (event) => {
  event.preventDefault();
  const searchedProfile = profilesSearch.value;
  if (searchedProfile === "") {
    domFeedback(profilesPage, "You forgot to write something");
  } else {
    const searchedProfileObject = await apiFetch(
      `/profiles/${searchedProfile}`,
    );
    const searchedProfilePosts = await apiFetch(
      `/profiles/${searchedProfile}/posts`,
    );
    console.log(searchedProfilePosts);
    if (searchedProfileObject === 404) {
      domFeedback(profilesPage, "That profile doesn't exist");
    } else {
      searchedProfileContainer.innerHTML = "";
      createUserProfile(searchedProfileContainer, searchedProfileObject.data);
      if (searchedProfilePosts.data.length === 0) {
        const noPostsMessage = createDOMElement("p", "This user has no posts");
        searchedProfileContainer.appendChild(noPostsMessage);
      } else {
        searchedProfilePosts.data.forEach((post) => {
          const postContainer = document.createElement("article");
          profilePosts(postContainer, post);
          searchedProfileContainer.appendChild(postContainer);
        });
      }
      profilesContainer.classList.remove("hidden");
    }
  }
});
