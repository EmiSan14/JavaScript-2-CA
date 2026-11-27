import { apiFetch, apiSinglePost } from "./api/apiClient.js";
import { populateFeed } from "./components/populate-feed.js";
import { postsState } from "./storage/states.js";
import { updateState } from "./utils/update-state.js";
import { decreasePage, incrementPage } from "./components/change-page.js";
import { createPost } from "./components/create-post.js";

export const feedContainer = document.getElementById("feedContainer");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const firstButton = document.getElementById("firstButton");
const lastButton = document.getElementById("lastButton");
const newPostButton = document.getElementById("newPostButton");
const newPostWindow = document.getElementById("newPostWindow");
const newPostTitle = document.getElementById("newPostTitle");
const newPostBody = document.getElementById("newPostBody");
const newPostSubmit = document.getElementById("newPostSubmit");
const dismissPostButton = document.getElementById("dismissPostButton");
const searchbar = document.getElementById("searchbar");

async function renderPosts(pageNumber) {
  try {
    const postsData = await apiFetch("/posts", pageNumber);
    populateFeed(feedContainer, postsData.data);
    updateState(postsData.meta, postsState);
    prevButton.setAttribute("disabled", true);
    lastButton.textContent = `last (${postsState.pageCount})`;
    sessionStorage.removeItem("postsFromSearch");
    return postsData;
  } catch (error) {
    console.error("Error occurred:", error.message);
    feedContainer.textContent = "An error occurred. Try again later";
  }
}

const initialLoad = await renderPosts(1);

nextButton.addEventListener("click", async () => {
  const postsFromSearch = sessionStorage.getItem("postsFromSearch");
  if (postsFromSearch) {
    const search = searchbar.value;
    const searchedPostsData = await apiFetch(
      `/posts/search?q=${search}`,
      postsState.currentPage + 1,
      search,
    );
    incrementPage(
      searchedPostsData,
      nextButton,
      prevButton,
      feedContainer,
      postsState,
    );
  } else {
    const newPostsData = await apiFetch("/posts", postsState.currentPage + 1);
    sessionStorage.removeItem("postsFromSearch");
    incrementPage(
      newPostsData,
      nextButton,
      prevButton,
      feedContainer,
      postsState,
    );
  }
});

prevButton.addEventListener("click", async () => {
  const postsFromSearch = sessionStorage.getItem("postsFromSearch");
  if (postsFromSearch) {
    const search = searchbar.value;
    const searchedPostsData = await apiFetch(
      `/posts/search?q=${search}`,
      postsState.currentPage - 1,
      search,
    );
    decreasePage(
      searchedPostsData,
      prevButton,
      nextButton,
      feedContainer,
      postsState,
    );
  } else {
    const newPostsData = await apiFetch("/posts", postsState.currentPage - 1);
    sessionStorage.removeItem("postsFromSearch");
    decreasePage(
      newPostsData,
      prevButton,
      nextButton,
      feedContainer,
      postsState,
    );
  }
});

firstButton.addEventListener("click", async () => {
  feedContainer.innerHTML = "";
  postsState.currentPage = 1;
  const apiMetaData = await renderPosts(postsState.currentPage);
  updateState(apiMetaData, postsState);
  prevButton.setAttribute("disabled", true);
  nextButton.removeAttribute("disabled");
});

lastButton.addEventListener("click", async () => {
  feedContainer.innerHTML = "";
  postsState.currentPage = postsState.pageCount;
  const apiMetaData = await renderPosts(postsState.currentPage);
  updateState(apiMetaData, postsState);
  nextButton.setAttribute("disabled", true);
  prevButton.removeAttribute("disabled");
});

newPostButton.addEventListener("click", () => {
  newPostWindow.classList.remove("hidden");
});

newPostSubmit.addEventListener("click", async () => {
  createPost(feedContainer, newPostTitle.value, newPostBody.value);
  newPostWindow.classList.add("hidden");
  newPostTitle.value = "";
  newPostBody.value = "";
});

dismissPostButton.addEventListener("click", () => {
  newPostWindow.classList.add("hidden");
  newPostTitle.value = "";
  newPostBody.value = "";
});

searchbar.addEventListener("keyup", async () => {
  const search = searchbar.value;
  const searchResults = await apiFetch(`/posts/search?q=${search}`, 1, search);
  sessionStorage.setItem("postsFromSearch", true);
  feedContainer.innerHTML = "";
  populateFeed(feedContainer, searchResults.data);
  updateState(searchResults.meta, postsState);
  // Don't have time to make work for search-results too, so just disabled for now
  firstButton.setAttribute("disabled", true);
  lastButton.setAttribute("disabled", true);
  prevButton.setAttribute("disabled", true);
  nextButton.setAttribute("disabled", true);
  lastButton.textContent = `last (${postsState.pageCount})`;
});

const allPostMoreButtons = document.querySelectorAll(".postMoreButton");
if (allPostMoreButtons) {
  allPostMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sessionStorage.setItem("postIdForIndPostPage", button.dataset.id);
    });
  });
}
