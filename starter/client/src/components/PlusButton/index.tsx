import PlusSvgComponent from 'assets/svg/plus';
import React from 'react';

// type Props = {
//   onClick: Function
// }

const PlusButton: React.FC = () => {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: '50%',
        bottom: '4%',
      }}
    >
      <button>
        <PlusSvgComponent className="w-10 h-10 text-white" />
      </button>
    </div>
  );
};

export default PlusButton;
