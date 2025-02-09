import { LoginMutation } from './login';
import { ProfileMutaion } from './profile';

export const mutation = [...LoginMutation, ...ProfileMutaion];
