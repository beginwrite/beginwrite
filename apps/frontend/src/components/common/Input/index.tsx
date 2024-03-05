import React from 'react';
import styled from '@emotion/styled';

const StyledInput = styled.input``;

export type InputProps = {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
};

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  required,
  disabled,
  autoFocus,
  autoComplete,
}) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
    />
  );
};

export default Input;
