import { loadData } from "../index.js";

import { showConfirmation, showError } from "../../utils/notification.js";

import { deleteTodo } from "../../API/index.js";

export function initDelete(todo, deleteButton) {
  deleteButton.addEventListener("click", async () => {
    const isConfirmed = await showConfirmation(
      "Are you sure you want to delete this task?",
    );
    if (!isConfirmed) {
      return;
    }
    try {
      await deleteTodo(todo.id);
      deleteButton.closest(".todo").remove();
    } catch (error) {
      console.error(error.message);
      showError("Can not delete the task ");
    }
  });
}
