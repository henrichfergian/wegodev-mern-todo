import PlusSvgComponent from 'assets/svg/plus';
import React from 'react';

type Props = {
  onClick: () => void;
};

const PlusButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: '50%',
        bottom: '4%',
      }}
      onClick={onClick}
    >
      <PlusSvgComponent className="w-10 h-10 text-white" />
    </div>
  );
};

export default PlusButton;
