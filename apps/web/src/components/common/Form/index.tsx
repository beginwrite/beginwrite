import React, { FC, FormEvent, ReactNode } from 'react';

import { styleForm } from './styles';

type FormProps = {
  children: ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  className?: string;
};

const Form: FC<FormProps> = ({ children, onSubmit, className }) => {
  return (
    <form onSubmit={onSubmit} className={styleForm({ class: className })}>
      {children}
    </form>
  );
};

export default Form;
