import { getUserInfo } from "../../utils/authHelper.js";
import { host } from "../host.js";

export async function deleteTodo(id) {
  try {
    const { uid, token } = await getUserInfo();

    const response = await fetch(`${host}/${uid}/${id}.json?auth=${token}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Can not delete the task. Status: ${response.status}`);
    }

    console.log("task deleted");
    return true;
  } catch (error) {
    console.error(`Delete error:`, error.message);
    throw error;
  }
}
