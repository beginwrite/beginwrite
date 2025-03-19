import styled from '@emotion/styled';
import React, { useCallback } from 'react';

import Button from '../../common/Button';
import Input from '../../common/Input';

import { useLogin } from './logic';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Login: React.FC = () => {
  const { handleSubmit, register } = useLogin();

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Input type="email" placeholder="emailを入力..." {...register('email')} />
      <Input
        type="password"
        placeholder="passwordを入力..."
        {...register('password')}
      />
      <Button type="submit">ログイン</Button>
    </Form>
  );
};

export default Login;
