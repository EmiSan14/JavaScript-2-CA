import { apiFetch, apiPUT } from "./api/apiClient.js";
import { createUserProfile, profilePosts } from "./components/user-profile.js";
import { domFeedback } from "./components/dom-feedback.js";
import { createDOMElement } from "./utils/create-dom-element.js";

const profilesPage = document.getElementById("profilesPage");
const profilesContainer = document.getElementById("profilesContainer");
const searchedProfileContainer = document.getElementById("searchedProfile");
const profilesSearch = document.getElementById("profilesSearch");
const profileSearchSubmit = document.getElementById("profileSearchSubmit");
const followButton = document.getElementById("followButton");
const unfollowButton = document.getElementById("unfollowButton");

profileSearchSubmit.addEventListener("click", async (event) => {
  event.preventDefault();
  const searchedProfile = profilesSearch.value;
  if (searchedProfile === "") {
    // Empty search
    domFeedback(profilesPage, "You forgot to write something");
  } else {
    // Get the profile and all their posts
    const searchedProfileObject = await apiFetch(
      `/profiles/${searchedProfile}`,
    );
    const searchedProfilePosts = await apiFetch(
      `/profiles/${searchedProfile}/posts`,
    );
    // Non-existent user
    if (searchedProfileObject === 404) {
      domFeedback(profilesPage, "That profile doesn't exist");
    } else {
      searchedProfileContainer.innerHTML = "";
      createUserProfile(searchedProfileContainer, searchedProfileObject.data);
      // For access when following/unfollowing
      sessionStorage.setItem(
        "searchedProfileName",
        searchedProfileObject.data.name,
      );
      // No posts for user
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
      followButton.classList.remove("hidden");
      unfollowButton.classList.remove("hidden");
    }
  }
});

followButton.addEventListener("click", async () => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (!accessToken) {
    domFeedback(profilesPage, "Must be logged in to follow a user");
  } else {
    const profileName = sessionStorage.getItem("searchedProfileName");
    const apiMessage = await apiPUT(
      `social/profiles/${profileName}/follow`,
      accessToken,
      profileName,
    );
    domFeedback(profilesPage, apiMessage);
  }
});

unfollowButton.addEventListener("click", async () => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (!accessToken) {
    domFeedback(profilesPage, "Must be logged in to unfollow a user");
  } else {
    const profileName = sessionStorage.getItem("searchedProfileName");
    const apiMessage = await apiPUT(
      `social/profiles/${profileName}/unfollow`,
      accessToken,
      profileName,
    );
    domFeedback(profilesPage, apiMessage);
  }
});
