import { apiFetch } from "./api/apiClient.js";
import { populateFeed } from "./components/populate-feed.js";
import { postsState } from "./storage/states.js";
import { updateState } from "./utils/update-state.js";
import { decreasePage, incrementPage } from "./components/change-page.js";

export const feedContainer = document.getElementById("feedContainer");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const firstButton = document.getElementById("firstButton");
const lastButton = document.getElementById("lastButton");

async function renderPosts(pageNumber) {
  try {
    const postsData = await apiFetch("/posts", pageNumber);
    populateFeed(feedContainer, postsData.data);
    updateState(postsData.meta);
    prevButton.setAttribute("disabled", true);
    lastButton.textContent = `last (${postsState.pageCount})`;
    return postsData;
  } catch (error) {
    console.error("Error occurred:", error.message);
    feedContainer.textContent = "An error occurred. Try again later";
  }
}

const initialLoad = await renderPosts(1);

nextButton.addEventListener("click", async () => {
  const newPostsData = await apiFetch("/posts", postsState.currentPage + 1);
  incrementPage(newPostsData, nextButton, prevButton);
});

prevButton.addEventListener("click", async () => {
  const newPostsData = await apiFetch("posts", postsState.currentPage - 1);
  decreasePage(newPostsData, prevButton, nextButton);
});

firstButton.addEventListener("click", async () => {
  feedContainer.innerHTML = "";
  postsState.currentPage = 1;
  const apiMetaData = await renderPosts(postsState.currentPage);
  updateState(apiMetaData);
  prevButton.setAttribute("disabled", true);
  nextButton.removeAttribute("disabled");
});

lastButton.addEventListener("click", async () => {
  feedContainer.innerHTML = "";
  postsState.currentPage = postsState.pageCount;
  const apiMetaData = await renderPosts(postsState.currentPage);
  updateState(apiMetaData);
  nextButton.setAttribute("disabled", true);
  prevButton.removeAttribute("disabled");
});
