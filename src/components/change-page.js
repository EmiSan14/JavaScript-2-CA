import { updateState } from "../utils/update-state.js";
import { populateFeed } from "./populate-feed.js";

export async function incrementPage(
  apiData,
  clickedButton,
  oppositeButton,
  container,
  state,
) {
  container.innerHTML = "";
  state.currentPage++;
  const apiMetaData = apiData.meta;
  const posts = apiData.data;
  updateState(apiMetaData, state);
  populateFeed(container, posts);
  if (state.currentPage === state.pageCount) {
    clickedButton.setAttribute("disabled", true);
  }
  if (state.currentPage > 1) {
    oppositeButton.removeAttribute("disabled");
  }
}

export async function decreasePage(
  apiData,
  clickedButton,
  oppositeButton,
  container,
  state,
) {
  container.innerHTML = "";
  state.currentPage--;
  const apiMetaData = apiData.meta;
  const posts = apiData.data;
  updateState(apiMetaData, state);
  populateFeed(container, posts);
  if (state.currentPage === 1) {
    clickedButton.setAttribute("disabled", true);
  }
  if (state.currentPage < state.pageCount) {
    oppositeButton.removeAttribute("disabled");
  }
}
