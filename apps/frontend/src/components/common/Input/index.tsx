import React from 'react';

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
    <input
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
