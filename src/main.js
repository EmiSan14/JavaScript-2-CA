import { apiFetch } from "./api/apiClient.js";
import { populateFeed } from "./components/populate-feed.js";

const feedContainer = document.getElementById("feedContainer");

async function renderPosts() {
  const posts = await apiFetch();
  console.log("Posts:", posts);
  populateFeed(feedContainer, posts);
}

renderPosts();
