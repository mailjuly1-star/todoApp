import { host } from "../host.js";
import { getUserInfo } from "../../utils/authHelper.js";

export async function deleteCompletedTodos(todosContainer) {
  try {
    const { uid, token } = await getUserInfo();

    const completedTodos = Array.from(
      todosContainer.querySelectorAll(".todo"),
    ).filter((todoElement) => {
      const checkbox = todoElement.querySelector('input[type="checkbox"]');
      return checkbox.checked;
    });

    for (const todoElement of completedTodos) {
      const taskId = todoElement.getAttribute("data-id");

      const deleteResponse = await fetch(
        `${host}/${uid}/${taskId}.json?auth=${token}`,
        {
          method: "DELETE",
        },
      );

      if (!deleteResponse.ok) {
        throw new Error(
          `Can not delete completed task. Status: ${deleteResponse.status}`,
        );
      }
      todoElement.remove();
    }

    return true;
  } catch (error) {
    throw error;
  }
}
