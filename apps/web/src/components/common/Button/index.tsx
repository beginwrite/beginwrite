import React from 'react';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ type, children }) => {
  return (
    <button type={type} className="bg-blue-600 text-white p-2 rounded-md">
      {children}
    </button>
  );
};

export default Button;
