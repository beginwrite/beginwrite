import { login } from './mutation/login';
import { uploadProfileAvatar, uploadProfile } from './mutation/profile';
import { user } from './query/user';
import { users } from './query/users';

export const handlers = [
  user(),
  users(),
  uploadProfileAvatar(),
  uploadProfile(),
  login(),
];
