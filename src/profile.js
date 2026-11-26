import { createUserProfile } from "./components/user-profile.js";

const userProfileContainer = document.getElementById("userProfile");

function profilePageOnStart() {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  if (!userProfile) {
    userProfileContainer.textContent = "";
  } else {
    createUserProfile(userProfileContainer, userProfile);
  }
}

profilePageOnStart();
