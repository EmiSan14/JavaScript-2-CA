import { updateState } from "../utils/update-state.js";
import { populateFeed } from "./populate-feed.js";

/**
 * Takes several different elements like next and prev-buttons
 * and uses other functions like updateState() and populateFeed()
 * to update the shown api-results by 1
 * (like from page 3 to 4 of an api's available pages)
 *
 * @param {Array} apiData - Fetched data from api
 * @param {HTMLButtonElement} clickedButton - The "next" button that was clicked
 * @param {HTMLButtonElement} oppositeButton - The "prev" button that wasn't clicked
 * @param {HTMLElement} container - Whichever container the results will be shown in
 * @param {Array} state - The "state" variable that holds meta-values like currentPage
 */
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

/* Same as incrementPage but for decreasing the page number
of shown api-results */
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
