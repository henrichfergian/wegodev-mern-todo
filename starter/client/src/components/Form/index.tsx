import CloseSvgComponent from 'assets/svg/close';
import React from 'react';

const Form: React.FC = () => {
  return (
    <div className="fixed flex flex-col z-10 inset-x-0 rounded-t-lg p-4 h-32 bg-white">
      <form className="flex justify-center items-center bg-gray-200 px-4 py-2 rounded-lg box-border">
        <input
          name="title"
          placeholder="task"
          className="text-darkPurple flex-1 bg-transparent outline-none"
        />
        <input name="status" defaultValue="uncompleted" className="hidden" />

        <input
          type="submit"
          value="Add"
          className="bg-transparent outline-none text-base font-bold text-darkPurple ml-1"
        />
      </form>
      <button
        className="absolute transform -translate-x-1/2 -translate-y-1/2"
        style={{
          bottom: '10px',
          left: '50%',
        }}
      >
        <CloseSvgComponent />
      </button>
    </div>
  );
};

export default Form;
