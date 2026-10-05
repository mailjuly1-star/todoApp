import { auth, signOut } from "../../firebaseConfig.js";
import { hideSignupForm } from "./signup.js";
import { showSigninForm } from "./signup.js";

document.getElementById("logout-button").addEventListener("click", async () => {
  try {
    await signOut(auth);
    hideSignupForm();
    showSigninForm(
      (document.getElementById("task-container").style.display = "none"),
    );
    console.log("log out user");
  } catch (error) {
    console.error("Error log out from system", error.message);
  }
});
