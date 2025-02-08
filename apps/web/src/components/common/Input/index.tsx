import styled from '@emotion/styled';
import React, { ComponentPropsWithoutRef, forwardRef } from 'react';

const StyledInput = styled.input``;

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  id?: string;
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
      id,
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
        id={id}
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
