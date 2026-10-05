import { host } from "../host.js";
import { getUserInfo } from "../../utils/authHelper.js";

export async function toggleTodoStatus(id, completed) {
  try {
    const { uid, token } = await getUserInfo();
    const response = await fetch(`${host}/${uid}/${id}.json?auth=${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) {
      throw new Error(
        `Can not update status the task. Status: ${response.status}`,
      );
    }

    console.log("task status updated");
    return true;
  } catch (error) {
    throw error;
  }
}
