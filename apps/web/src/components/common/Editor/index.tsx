import styled from '@emotion/styled';
import React, { FC, useCallback } from 'react';
import { ChangeHandler, UseFormRegister } from 'react-hook-form';
import { richmd } from 'richmd';
import 'richmd/richmd.css';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledEditor = styled.textarea`
  width: 50%;
  height: 100%;
  padding: 1rem;
  resize: none;
  border: none;
  outline: none;
`;

const Preview = styled.div`
  width: 50%;
  height: 100%;
  padding: 1rem;
`;

const Line = styled.span`
  width: 0px;
  height: 100%;
  padding: 1rem;
  border-left: 1px solid #ccc;
`;

type EditorProps = {
  id?: string;
  name?: string;
  value?: string;
  className?: string;
  register?: UseFormRegister<{ title: string; content: string }>;
  setValue?: (value: string) => void;
};

const Editor: FC<EditorProps> = ({
  name,
  value,
  className,
  register,
  setValue,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setValue?.(value);
    },
    [],
  );

  return (
    <Wrapper className={className}>
      <StyledEditor
        name={name}
        placeholder="Write your note here..."
        onChange={handleChange}
        value={value}
        {...register}
      />
      <Line />
      <Preview dangerouslySetInnerHTML={{ __html: richmd(value ?? '') }} />
    </Wrapper>
  );
};

export default Editor;
