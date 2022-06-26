import Axios from "axios";
import { ApiEndpoint } from "global/ApiEndpoint";
import { getErrorMessage } from "utils";

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await Axios.delete(ApiEndpoint.removeTodo(id));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}