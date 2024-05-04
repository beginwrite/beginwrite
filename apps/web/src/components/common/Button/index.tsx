import styled from '@emotion/styled';
import React from 'react';

const StyledButton = styled.button``;

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ type, children }) => {
  return <StyledButton type={type}>{children}</StyledButton>;
};

export default Button;
