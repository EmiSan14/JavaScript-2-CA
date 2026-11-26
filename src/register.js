import { apiPOST } from "./api/apiClient.js";
import { domFeedback } from "./components/dom-feedback.js";

const registerPage = document.getElementById("register-page");
const nameRegisterPage = document.getElementById("username-register-page");
const emailRegisterPage = document.getElementById("email-register-page");
const passwordRegisterPage = document.getElementById("password-register-page");
const passwordRepeat = document.getElementById("password-register-page-repeat");
const submitRegisterPage = document.getElementById("register-submit");

submitRegisterPage.addEventListener("click", async (event) => {
  event.preventDefault();
  if (passwordRegisterPage.value === passwordRepeat.value) {
    const data = await apiPOST(
      "auth/register",
      emailRegisterPage.value,
      passwordRegisterPage.value,
      nameRegisterPage.value,
    );
    domFeedback(registerPage, data);
  } else {
    domFeedback(registerPage, "Passwords must match");
  }
  passwordRegisterPage.value = "";
  passwordRepeat.value = "";
});
