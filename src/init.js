import {
  initDeleteCompleted,
  initAddTodo,
  hideSigninForm,
  hideSignupForm,
  showTasksBlock,
} from "./components/index.js";
import { auth, onAuthStateChanged } from "./firebaseConfig.js";
import { loadData } from "./components/index.js";
import { showWarning } from "./utils/notification.js";

export function initApp() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!user.emailVerified) {
        showWarning("Your email is not verified. Please check your email");
        return;
      }
      loadData();
      showTasksBlock();
      hideSigninForm();
      hideSignupForm();
    } else {
      console.log("User is not authorized");
      document.getElementById("signup-form").style.display = "block";
    }
  });
  initAddTodo();
  initDeleteCompleted();
}
