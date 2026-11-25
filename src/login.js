import { apiLoginOrRegisterAttempt } from "./api/apiClient.js";

const emailLoginPage = document.getElementById("email-login-page");
const passwordLoginPage = document.getElementById("password-login-page");
const submitLoginPage = document.getElementById("login-submit");

submitLoginPage.addEventListener("click", async (event) => {
  event.preventDefault();
  const data = await apiLoginOrRegisterAttempt(
    "auth/login",
    emailLoginPage.value,
    passwordLoginPage.value,
  );
  const accessToken = data.data.accessToken;
  sessionStorage.setItem("accessToken", accessToken);
});
