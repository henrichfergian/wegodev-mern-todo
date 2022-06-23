import { Document, Schema } from 'mongoose';

export interface Todo extends Document {
  title: string;
  status: 'complete' | 'uncomplete';
}