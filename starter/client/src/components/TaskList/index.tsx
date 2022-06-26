import TaskCard from 'components/TaskCard';
import React from 'react';

const TaskList: React.FC = () => {
  return (
    <section className="flex flex-col overflow-x-hidden overflow-y-auto h-taskList rounded">
      <TaskCard title="hello there" />
    </section>
  );
};

export default TaskList;
