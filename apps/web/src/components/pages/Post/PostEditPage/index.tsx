import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Button from '@/components/common/Button';
import Editor from '@/components/common/Editor';
import Input from '@/components/common/Input';
import { useAuthUser } from '@/hooks/useAuthUser';

import { useUpdatePost } from './logic';

const PageWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
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

const SubmitButton = styled(Button)`
  width: 95%;
  padding: 1rem;
  margin: 1rem;
  font-size: 1.5rem;
`;

type PostEditPageProps = {
  postId: string;
};

const PostEditPage: React.FC<PostEditPageProps> = ({ postId }) => {
  const { authUser, loading } = useAuthUser();

  const {
    form,
    data,
    submit,
    handleSetContentValue,
    loading: updateLoading,
  } = useUpdatePost(postId, authUser?.id || '');

  // TODO: ローディングを実装する
  if (!data || loading) {
    return null;
  }

  return (
    <PageWrapper>
      <Form onSubmit={submit}>
        <SubmitButton type="submit">
          {updateLoading ? '更新中...' : '更新'}
        </SubmitButton>
        <TitleInput
          type="text"
          placeholder="タイトルを入力"
          {...form.register('title')}
        />
        <StyledEditor
          name="content"
          register={form.register}
          setValue={handleSetContentValue}
          value={form.watch('content')}
        />
      </Form>
    </PageWrapper>
  );
};

export default PostEditPage;
