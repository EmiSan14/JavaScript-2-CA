export function updateState(apiMetadata, state) {
  state.isFirstPage = apiMetadata.isFirstPage;
  state.isLastPage = apiMetadata.isLastPage;
  state.pageCount = apiMetadata.pageCount;
}
