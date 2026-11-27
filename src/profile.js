import { createUserProfile, profilePosts } from "./components/user-profile.js";
import { apiFetch } from "./api/apiClient.js";

const userProfileContainer = document.getElementById("userProfile");
const newPostWindowEdit = document.getElementById("newPostWindowEdit");
const newPostTitleEdit = document.getElementById("newPostTitleEdit");
const newPostBodyEdit = document.getElementById("newPostBodyEdit");
const newPostSubmitEdit = document.getElementById("newPostSubmitEdit");
const dismissPostButtonEdit = document.getElementById("dismissPostButtonEdit");
const editOrDeletePrompt = document.getElementById("editOrDeletePrompt");
const editPostButton = document.getElementById("toEdit");
const deletePostButton = document.getElementById("toDelete");
const dismissPromptButton = document.getElementById("toDismiss");

async function profilePageOnStart() {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const userProfilePosts = await apiFetch(
    `/profiles/${userProfile.name}/posts`,
  );
  if (!userProfile) {
    userProfileContainer.textContent = "";
  } else {
    createUserProfile(userProfileContainer, userProfile);
    userProfilePosts.data.forEach((post) => {
      const postContainer = document.createElement("article");
      profilePosts(postContainer, post);
      userProfileContainer.appendChild(postContainer);
    });
    const allPosts = document.querySelectorAll(".post");
    allPosts.forEach((post) => {
      addEventListener("click", () => {
        // WHAT THE FUCK IS YOUR ISSUE??!!!?!!?!?!?!
        editOrDeletePrompt.classList.remove("hidden");
        editOrDeletePrompt.classList.add("flex");
      });
    });
  }
}

profilePageOnStart();

dismissPostButtonEdit.addEventListener("click", () => {
  newPostWindowEdit.classList.add("hidden");
});

editPostButton.addEventListener("click", () => {
  // WHAT THE FUCK IS YOUR ISSUE??!!!?!!?!?!?!
  console.log("Fuck you");
  editOrDeletePrompt.classList.add("hidden");
  editOrDeletePrompt.classList.remove("flex");
  newPostWindowEdit.classList.remove("hidden");
});

dismissPromptButton.addEventListener("click", () => {
  console.log("Fuck you");
  editOrDeletePrompt.classList.remove("flex");
  editOrDeletePrompt.classList.add("hidden");
});
