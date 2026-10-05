import { showError } from "../../utils/notification.js";
import { deleteCompletedTodos } from "../../API/index.js";
import { deleteCompletedButton, loadData, todosContainer } from "../index.js";import { showConfirmation } from "../../utils/notification.js";

export function initDeleteCompleted() {
  deleteCompletedButton.addEventListener("click", async () => {
    const  isConfirmed  = await showConfirmation('All completed tasks  will be removed! Are you sure?')
    if (!isConfirmed) {
      return;
    }

    try {
      await deleteCompletedTodos(todosContainer);
      await loadData();
    } catch (error) {
      console.error(error.message);
      showError("Can not delete task list");
    }
  });
}
