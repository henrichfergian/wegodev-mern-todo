import { Request, Response } from 'express';
import TodoModel from 'models/todo';
import { Todo } from 'types/todo';

export const getTodos = async (req: Request, res: Response) => {
  const todos: Todo[] = await TodoModel.find();
  res.status(200).json({ todos });
};
