import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import styled from '@emotion/styled';

const StyledInput = styled.input``;

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  type: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      type,
      placeholder,
      value,
      onChange,
      onFocus,
      onBlur,
      required,
      disabled,
      autoFocus,
      autoComplete,
    },
    ref,
  ) => {
    return (
      <StyledInput
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
      />
    );
  },
);

export default Input;
