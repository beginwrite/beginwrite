import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import Editor from '@/components/common/Editor';
import Input from '@/components/common/Input';
import { useAuthUser } from '@/hooks/useAuthUser';

import { createPostMutation, CreatePostMutation } from './gql';

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

const PostCreatePage: React.FC = () => {
  const id = localStorage.getItem('user_id');
  const authUser = useAuthUser(id!);

  const form = useForm<{
    title: string;
    content: string;
  }>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const [submitPost] = useMutation<CreatePostMutation>(createPostMutation, {
    onCompleted: () => {
      // TODO: 投稿詳細ページに遷移
    },
    onError: () => {
      // TODO: エラーハンドリング
    },
  });

  const submit = form.handleSubmit(async (values) => {
    await submitPost({
      variables: {
        data: {
          ...values,
          userId: authUser?.id,
        },
      },
    });
  });

  const handleSetContentValue = useCallback((value: string) => {
    form.setValue('content', value);
  }, []);

  return (
    <PageWrapper>
      <Form onSubmit={submit}>
        <SubmitButton type="submit">投稿</SubmitButton>
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

export default PostCreatePage;
