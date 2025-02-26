import styled from '@emotion/styled';
import React, { FC, useCallback } from 'react';
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
  value: string;
  className?: string;
  onChange: (value: string) => void;
};

const Editor: FC<EditorProps> = ({ value, onChange, className }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [],
  );

  return (
    <Wrapper className={className}>
      <StyledEditor
        placeholder="Write your note here..."
        value={value}
        onChange={handleChange}
      />
      <Line />
      <Preview dangerouslySetInnerHTML={{ __html: richmd(value) }} />
    </Wrapper>
  );
};

export default Editor;
