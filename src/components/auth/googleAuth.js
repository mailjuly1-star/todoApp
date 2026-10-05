import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
} from "../../firebaseConfig.js";
import { showError } from "../../utils/notification.js";

export async function signWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    if (result._tokenResponse.isNewUser) {
      console.log("registration with google is successful");
    } else {
      console.log("Log in with google is successful");
    }
  } catch (error) {
    console.error("error log in with google:", error.message);
  }
}
