import { getTodo } from "api/getTodo";
import Axios from "axios";
import { TodoStatus } from "enums/todos.enum";
import { ApiEndpoint } from "global/ApiEndpoint";
import { TodoBody } from "types/todos.types";
import { getErrorMessage } from "utils";

export const updateTodo = async (id: string): Promise<void> => {
  try {
    const getTodoRes = await getTodo(id);

    if (getTodoRes.status === 200) {
      const todo = getTodoRes.data.result;
      const newBody: TodoBody = {
        title: todo.title,
        status: todo.status === TodoStatus.completed ? 'uncompleted' : 'completed'
      }

      await Axios({
        method: 'PUT',
        url: ApiEndpoint.updateTodo(id),
        data: newBody
      })
    }

  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}