import { apiSinglePost } from "./api/apiClient.js";
import { createFullPost } from "./components/full-post.js";

const individualPostContainer = document.getElementById(
  "individualPostContainer",
);

async function individualPostOnStart() {
  const fetchedPostId = sessionStorage.getItem("postIdForIndPostPage");
  console.log(fetchedPostId);
  const fetchedPost = await apiSinglePost(fetchedPostId);
  console.log(fetchedPost.data);
  createFullPost(individualPostContainer, fetchedPost.data);
}

await individualPostOnStart();
