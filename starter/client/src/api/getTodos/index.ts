import Axios from 'axios';
import { ApiEndpoint } from 'global/ApiEndpoint';
import { Todos } from 'types/todos.types';
import { getErrorMessage } from 'utils';

export const getTodos = async (): Promise<Todos> => {
  try {
    const res = await Axios.get(ApiEndpoint.getTodos)
    
    return res.data
    
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}