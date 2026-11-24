import { postsState } from "../storage/states.js";

export function updateState(apiMetadata) {
  postsState.isFirstPage = apiMetadata.isFirstPage;
  postsState.isLastPage = apiMetadata.isLastPage;
  postsState.pageCount = apiMetadata.pageCount;
}
