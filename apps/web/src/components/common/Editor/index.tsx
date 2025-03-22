import styled from '@emotion/styled';
import React, { FC, useCallback } from 'react';
import { richmd } from 'richmd';

import type { UseFormRegister } from 'react-hook-form';
// TODO: richmd の CSS 構成を見直すため、一時的にコメントアウトする
// import 'richmd/richmd.css';

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
    [setValue],
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
