import { host } from "../host.js";
import { getUserInfo } from "../../utils/authHelper.js";

export async function updateTasksOrderOnServer(taskId, order) {
  try {
    const { uid, token } = await getUserInfo();

    const response = await fetch(
      `${host}/${uid}/${taskId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Can not update order the task. Status: ${response.status}`,
      );
    }
  } catch (error) {
    throw error;
  }
}
