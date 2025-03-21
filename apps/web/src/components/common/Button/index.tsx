import React from 'react';

import { button } from './styles';
export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ type, children }) => {
  return (
    <button type={type} className={button({ colors: 'primary' })}>
      {children}
    </button>
  );
};

export default Button;
