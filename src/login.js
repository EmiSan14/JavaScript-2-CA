import { apiPOST } from "./api/apiClient.js";
import { domFeedback } from "./components/dom-feedback.js";

const loginPage = document.getElementById("login-page");
const emailLoginPage = document.getElementById("email-login-page");
const passwordLoginPage = document.getElementById("password-login-page");
const submitLoginPage = document.getElementById("login-submit");

submitLoginPage.addEventListener("click", async (event) => {
  event.preventDefault();
  const data = await apiPOST(
    "auth/login",
    emailLoginPage.value,
    passwordLoginPage.value,
  );
  domFeedback(loginPage, "Login successful");
  const accessToken = data.data.accessToken;
  console.log("accessToken:", accessToken);
  sessionStorage.setItem("accessToken", accessToken);
  // emailLoginPage.value = "";
  // passwordLoginPage.value = "";
});
