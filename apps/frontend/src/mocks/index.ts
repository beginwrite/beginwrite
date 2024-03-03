import { users } from './query/users';
import { setupServer } from 'msw/node';
export const handlers = [users()];

export const server = setupServer(...handlers);
