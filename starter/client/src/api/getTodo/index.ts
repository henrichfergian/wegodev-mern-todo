import Axios, { AxiosResponse } from 'axios';
import { ApiEndpoint } from 'global/ApiEndpoint';
import { getTodoResult } from 'types/todos.types';
import { getErrorMessage } from 'utils';

export const getTodo = async (id: string): Promise<AxiosResponse<getTodoResult>> => {
  try {
    const res = await Axios({
      method: 'GET',
      url: ApiEndpoint.getTodo(id),
    });
    
    return res;
    
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}