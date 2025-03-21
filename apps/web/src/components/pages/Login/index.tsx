import React from 'react';

import Button from '../../common/Button';
import Input from '../../common/Input';

import { useLogin } from './logic';

const Login: React.FC = () => {
  const { handleSubmit, register } = useLogin();

  // TODO: Form コンポーネントを作成する
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1>Login</h1>
      <Input type="email" placeholder="emailを入力..." {...register('email')} />
      <Input
        type="password"
        placeholder="passwordを入力..."
        {...register('password')}
      />
      <Button type="submit">ログイン</Button>
    </form>
  );
};

export default Login;
