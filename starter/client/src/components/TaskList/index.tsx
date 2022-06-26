import { getTodos } from 'api/getTodos';
import TaskCard from 'components/TaskCard';
import React from 'react';
import { useQuery } from 'react-query';

const TaskList: React.FC = () => {
  const { isLoading, isError, data } = useQuery('todos', getTodos);

  if (isLoading) {
    return (
      <div className="text-white text-sm tracking-wide font-bold px-4 py-2 rounded">
        Is Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-white text-sm tracking-wide font-bold px-4 py-2 rounded">
        is Error... {isError}
      </div>
    );
  }

  return (
    <section className="flex flex-col overflow-x-hidden overflow-y-auto h-taskList rounded">
      {data?.todos.map((todo) => {
        return (
          <TaskCard
            key={todo._id}
            taskId={todo._id}
            title={todo.title}
            status={todo.status}
          />
        );
      })}
    </section>
  );
};

export default TaskList;
