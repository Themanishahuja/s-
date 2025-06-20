import React from 'react';

interface AvatarProps {
  initial: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ initial, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center 
                 text-lg font-semibold ring-2 ring-blue-400 hover:ring-blue-300 transition-all
                 duration-300 shadow-md"
      aria-label="User profile"
    >
      {initial}
    </button>
  );
};

export default Avatar;