import Axios from "axios";
import { ApiEndpoint } from "global/ApiEndpoint";
import { TodoBody } from "types/todos.types";
import { getErrorMessage } from "utils";

export const postTodo = async (data: TodoBody): Promise<void> => {
  try {
    await Axios({
      method: 'POST',
      url: ApiEndpoint.addTodo,
      data,
    })
  } catch (error) {
    getErrorMessage(error);
  }
}