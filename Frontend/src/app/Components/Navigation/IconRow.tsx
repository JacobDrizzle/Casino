import React, { ReactElement } from 'react';

interface IconRowProps {
  icons: ReactElement[];
}

const IconRow: React.FC<IconRowProps> = ({ icons }) => {
  return (
    <div className="mt-[10px] pt-[10px] pl-[14px] bg-[rgb(26, 38, 53)]">
      {icons.map((icon, index) => (
        <div key={index} className="pb-[30px] cursor-pointer font-[18px] text-neutral-200">
          {icon}
        </div>
      ))}
    </div>
  );
};

export default IconRow;