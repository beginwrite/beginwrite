import styled from '@emotion/styled';
import React, { ComponentPropsWithoutRef } from 'react';

const StyledInput = styled.input``;

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  id?: string;
  type: string;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  ref?: React.Ref<HTMLInputElement>;
};

const Input = ({
  id,
  name,
  type,
  placeholder,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  required,
  disabled,
  autoFocus,
  autoComplete,
  ref,
}: InputProps) => {
  return (
    <StyledInput
      id={id}
      ref={ref}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      required={required}
      disabled={disabled}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
    />
  );
};

export default Input;
