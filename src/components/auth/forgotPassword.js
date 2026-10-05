import { auth, sendPasswordResetEmail } from "../../firebaseConfig.js";

const forgotPasswordForm = document.getElementById("forgot-password-form");
const forgotPasswordMessage = document.getElementById(
  "forgot-password-message",
);
forgotPasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("forgot-password-email").value;
  try {
    await sendPasswordResetEmail(auth, email);
    forgotPasswordMessage.textContent =
      "letter to reset password is send to your email";
    forgotPasswordMessage.style.color = "green";
    forgotPasswordForm.style.display = "none";
  } catch (error) {
    console.error("Error to send letter", error.message);
    forgotPasswordMessage.textContent = `Error: ${error.message}`;
    forgotPasswordMessage.style.color = "red";
  }
});
