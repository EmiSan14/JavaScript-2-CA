import { postsState } from "../storage/states.js";
import { updateState } from "../utils/update-state.js";
import { feedContainer } from "../main.js";
import { populateFeed } from "./populate-feed.js";

export async function incrementPage(apiData, clickedButton, oppositeButton) {
  feedContainer.innerHTML = "";
  postsState.currentPage++;
  const apiMetaData = apiData.meta;
  const posts = apiData.data;
  updateState(apiMetaData);
  populateFeed(feedContainer, posts);
  if (postsState.currentPage === postsState.pageCount) {
    clickedButton.setAttribute("disabled", true);
  }
  if (postsState.currentPage > 1) {
    oppositeButton.removeAttribute("disabled");
  }
}

export async function decreasePage(apiData, clickedButton, oppositeButton) {
  feedContainer.innerHTML = "";
  postsState.currentPage--;
  const apiMetaData = apiData.meta;
  const posts = apiData.data;
  updateState(apiMetaData);
  populateFeed(feedContainer, posts);
  if (postsState.currentPage === 1) {
    clickedButton.setAttribute("disabled", true);
  }
  if (postsState.currentPage < postsState.pageCount) {
    oppositeButton.removeAttribute("disabled");
  }
}
