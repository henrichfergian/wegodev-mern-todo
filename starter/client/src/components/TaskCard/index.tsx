import { updateTodo } from 'api/updateTodo';
import ChecklistSvgComponent from 'assets/svg/checklist';
import ClockSvgComponent from 'assets/svg/clock';
import TrashSvgComponent from 'assets/svg/trash';
import DeleteModal from 'components/DeleteModal';
import React from 'react';
import { useMutation } from 'react-query';
import { useQueryCache } from 'react-query';

import classNames from 'classnames';

type Props = {
  title: string;
  taskId: string;
  status: 'completed' | 'uncompleted';
};

const TaskCard: React.FC<Props> = ({ title, taskId, status }) => {
  const cache = useQueryCache();

  const [checkTodo, { isLoading }] = useMutation(updateTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos');
    },
  });

  const containerClass = classNames(
    'flex justify-center items-center relative rounded p-4 mb-2',
    {
      'bg-white text-darkpurple': status === 'uncompleted',
      'bg-gray-300 bg-opacity-50': status === 'completed',
    }
  );

  const titleClass = classNames(
    'flex-1 text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal truncate',
    { 'line-through': status === 'completed' }
  );

  const checkListClass = classNames({
    'text-red-400': status === 'completed',
    'text-red-600': status === 'uncompleted',
  });

  return (
    <div className={containerClass}>
      {console.log('containerClass', containerClass)}
      <p className={titleClass}>{title}</p>
      {console.log('titleClass', titleClass)}
      <div className="flex text-darkPurple">
        <span className="w-5 h-5 ml-4">
          {isLoading ? (
            <ClockSvgComponent />
          ) : (
            <ChecklistSvgComponent
              className={checkListClass}
              onClick={() => {
                checkTodo(taskId);
              }}
            />
          )}
        </span>
        <span className="w-5 h-5 ml-4 text-red-600">
          <TrashSvgComponent />
        </span>
      </div>
      {/* <DeleteModal /> */}
    </div>
  );
};

export default TaskCard;
