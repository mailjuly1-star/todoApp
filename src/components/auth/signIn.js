import {
  auth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "../../firebaseConfig.js";
import {
  showConfirmation,
  showSuccess,
  showWarning,
} from "../../utils/notification.js";
import { loadData } from "../index.js";
import { signWithGoogle } from "./googleAuth.js";

const googleButton = document.getElementById("google-signin-button");
googleButton.addEventListener("click", signWithGoogle);

const forgotPasswordForm = document.getElementById("forgot-password-form");
const forgotPasswordButton = document.getElementById("forgot-password-button");
forgotPasswordButton.addEventListener("click", showForgotPasswordForm);

const signinForm = document.getElementById("signin-form");
const taskContainer = document.getElementById("task-container");

signinForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    if (!user.emailVerified) {
      showWarning("To Log In verify your email. Please check your email");
      const resend = await showConfirmation("Resend email ?");
      if (resend) {
        await sendEmailVerification(user);
        showSuccess("Verification letter has been resend. Check your email ");
      }
      return;
    }

    hideSigninForm();
    showTasksBlock();
    loadData();
  } catch (error) {
    switch (error.code) {
      case "auth/too-many-requests":
        showWarning("Too many requests.Please try later");
        break;
      case "auth/invalid-credential":
        showWarning("Wrong data.Check your email and password");
        break;

      default:
        showWarning("Authorisation error: ", error.message, error.code);
    }
  }
});
export function showTasksBlock() {
  taskContainer.style.display = "block";
}

export function hideSigninForm() {
  signinForm.style.display = "none";
}

function showForgotPasswordForm() {
  forgotPasswordForm.style.display = "flex";
  hideSigninForm();
}
