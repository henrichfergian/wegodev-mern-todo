import { Request, Response } from 'express';
import TodoModel from 'models/todo';
import { title } from 'process';
import { Todo } from 'types/todo';

export const getTodos = async (req: Request, res: Response) => {
  const todos: Todo[] = await TodoModel.find();
  res.status(200).json({ todos });
};

export const getTodo = async (req: Request, res: Response) => {
  await TodoModel.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.status(200).json({ result });
    }
  });
};

export const addTodo = async (req: Request, res: Response) => {
  const body: Pick<Todo, 'title' | 'status'> = req.body;

  if (!body.title || !body.status) {
    res.status(401).json({
      errorMessage: `Validation Error: Todo validation falied: title: ${body.title}, status: ${body.status}`,
    });
    return;
  }
  const newTodoModel = new TodoModel({
    title: body.title,
    status: body.status,
  });

  const newTodo = await newTodoModel.save();
  const updatedAllTodosAfterSave = await TodoModel.find();

  res.status(201).json({
    message: `ToDo successfully added!`,
    addedTo: newTodo,
    allTodosAfterAddition: updatedAllTodosAfterSave,
  });
};

export const updateTodo = async (req: Request, res: Response) => {
  const {
    params: { id },
    body,
  } = req;

  if (!body.title || !body.status || id) {
    res.status(401).json({
      errorMessage: `Validation Error: _id or required properties is not defined`,
    });
    return;
  }

  const updatedTodo = await TodoModel.findByIdAndUpdate({ _id: id }, body);
  const updatedAllTodosAfterUpdate = await TodoModel.find();

  if (!updatedTodo) {
    res
      .send(501)
      .json({ status: 501, errorMessage: 'edit ToDo failed. Not implemented' });

    return;
  } else {
    res.send(200).json({
      message: 'ToDo successfully edited',
      updatedTodo,
      todos: updatedAllTodosAfterUpdate,
    });
  }
};

export const removeTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedTodo = await TodoModel.findByIdAndDelete({ _id: id });
  const updatedAllTodosAfterDelete = await TodoModel.find();

  if (!deletedTodo) {
    res.send(401).json({ errorMessage: 'Delete ToDo failed. Not Implemented' });
  } else {
    res.send(200).json({
      message: 'ToDo successfully deleted!',
      deletedTodo,
      todos: updatedAllTodosAfterDelete,
    });
  }
};
