import { getTodos } from "../../API/index.js";
import { renderTodo } from "../index.js";
import { showLoader, hideLoader } from "../../utils/helpers.js";
import { showError, showInfo } from "../../utils/notification.js";

import { getUserInfo } from "../../utils/authHelper.js";

export async function loadData() {
  try {
    showLoader();

    const { uid, token } = await getUserInfo();
    const todos = await getTodos(uid, token);

    if (todos.length === 0) {
      showInfo("У Вас пока нет задач");
    } else {
      renderTodo(todos);
    }
  } catch (error) {
    console.error(error.message);
    showError("Con not receive tasks");
  } finally {
    hideLoader();
  }
}
