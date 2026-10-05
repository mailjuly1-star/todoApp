import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "../../firebaseConfig.js";
import {
  showError,
  showSuccess,
  showWarning,
} from "../../utils/notification.js";
import { signWithGoogle } from "./googleAuth.js";

const googleButton = document.getElementById("google-signup-button");
googleButton.addEventListener("click", signWithGoogle);

const signupForm = document.getElementById("signup-form");
const signinForm = document.getElementById("signin-form");
const signinButton = document.getElementById("signin");

signinButton.addEventListener("click", (event) => {
  event.preventDefault();
  hideSignupForm();
  showSigninForm();
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;
    await sendEmailVerification(user);

    showSuccess("Registration is successful. You can enter");
    signupForm.reset();
    hideSignupForm();
    showSigninForm();
  } catch (error) {
    switch (error.code) {
      case ("auth/email-already-exists", "auth/email-already-in-use"):
        showWarning("This email is already registered");
        break;
      case "auth/invalid-email":
        showWarning("This email is invalid");
        break;
      case "auth/weak-password":
        showWarning("Password must be at last 6 symbols");
        break;
      default:
        showWarning("Unknown error: ", error.message, error.code);
    }
  }
});

export function hideSignupForm() {
  signupForm.style.display = "none";
}
export function showSigninForm() {
  signinForm.style.display = "block";
}
