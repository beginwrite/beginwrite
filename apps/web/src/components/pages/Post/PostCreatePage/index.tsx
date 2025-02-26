import styled from '@emotion/styled';
import React, { useCallback, useRef, useState } from 'react';

import Editor from '@/components/common/Editor';
import Input from '@/components/common/Input';

const PageWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const EditorWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleInput = styled(Input)`
  width: 95%;
  padding: 1rem;
  marigin: 1rem;
  font-size: 1.5rem;
`;

const StyledEditor = styled(Editor)`
  width: 95%;
  height: 100vh;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const PostCreatePage: React.FC = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [],
  );

  const handleContentChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <PageWrapper>
      <h1>投稿作成画面</h1>
      <EditorWrapper>
        <TitleInput
          ref={titleRef}
          type="text"
          defaultValue={title}
          onChange={handleTitleChange}
          placeholder="タイトルを入力"
        />
        <StyledEditor onChange={handleContentChange} value={value} />
      </EditorWrapper>
    </PageWrapper>
  );
};

export default PostCreatePage;
