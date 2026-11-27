import { createUserProfile, profilePosts } from "./components/user-profile.js";
import { apiFetch, apiPUT, apiDELETE } from "./api/apiClient.js";
import { domFeedback } from "./components/dom-feedback.js";

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
      post.addEventListener("click", () => {
        sessionStorage.setItem(
          "clickedPostTitle",
          post.firstElementChild.textContent,
        );
        sessionStorage.setItem(
          "clickedPostBody",
          post.firstElementChild.nextElementSibling.textContent,
        );
        sessionStorage.setItem("clickedPostId", post.dataset.id);
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
  editOrDeletePrompt.classList.add("hidden");
  editOrDeletePrompt.classList.remove("flex");
  newPostWindowEdit.classList.remove("hidden");
  newPostTitleEdit.value = sessionStorage.getItem("clickedPostTitle");
  newPostBodyEdit.value = sessionStorage.getItem("clickedPostBody");
});

dismissPromptButton.addEventListener("click", () => {
  editOrDeletePrompt.classList.remove("flex");
  editOrDeletePrompt.classList.add("hidden");
});

newPostSubmitEdit.addEventListener("click", async () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const newPost = {
    title: newPostTitleEdit.value,
    body: newPostBodyEdit.value,
  };
  const postId = sessionStorage.getItem("clickedPostId");
  const editedPostMessage = await apiPUT(
    `social/posts/${postId}`,
    accessToken,
    postId,
    newPost,
  );
  setTimeout(() => {
    window.location.reload();
  }, 2000);
  domFeedback(userProfileContainer, editedPostMessage);
});

deletePostButton.addEventListener("click", async () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const postId = sessionStorage.getItem("clickedPostId");
  const deletedPostMessage = await apiDELETE(
    `social/posts/${postId}`,
    accessToken,
  );
  setTimeout(() => {
    window.location.reload();
  }, 2000);
  domFeedback(userProfileContainer, deletedPostMessage);
});
