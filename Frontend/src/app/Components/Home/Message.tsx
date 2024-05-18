// Home/Message.tsx

import React from 'react';

interface MessageProps {
  text: string;
}

const Message: React.FC<MessageProps> = ({ text }) => {
  return (
    <div className="items-center px-3 py-2.5 my-2 text-neutral-200 bg-slate-800 border border-[rgba(244,196,88,0.8)] rounded-xl bg-[rgba(26,38,53,1)]">
      <p>{text}</p>
    </div>
  );
};

export default Message;