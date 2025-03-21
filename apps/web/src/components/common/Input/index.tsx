import React, { ComponentPropsWithoutRef } from 'react';

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
  className?: string;
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
  className,
  ref,
}: InputProps) => {
  return (
    <input
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
      className={`w-full p-2 border border-gray-300 rounded-md text-base ${className}`}
    />
  );
};

export default Input;
