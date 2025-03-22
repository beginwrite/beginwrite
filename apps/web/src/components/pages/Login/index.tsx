import React from 'react';

import Button from '../../common/Button';
import Form from '../../common/Form';
import Input from '../../common/Input';

import { useLogin } from './logic';

const Login: React.FC = () => {
  const { handleSubmit, register } = useLogin();

  // TODO: Form コンポーネントを作成する
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
