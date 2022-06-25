import { model, Schema } from 'mongoose';
import { Todo } from '../types/todo';

const TodoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    status: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export default model<Todo>('Todo', TodoSchema);
