import { User } from '../domains/users/entities/users.entity';

export const mockUsers: User[] = [
  {
    id: 1,
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    name: 'John Doe',
    displayName: 'Johnny',
    bio: 'Software developer with 5 years of experience',
    avatar: 'https://example.com/avatars/john.jpg',
    email: 'john@example.com',
    hash: 'hashed_password_1',
    accessToken: 'access_token_1',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 2,
    uuid: '223e4567-e89b-12d3-a456-426614174001',
    name: 'Jane Doe',
    displayName: 'Janey',
    bio: 'UX Designer passionate about user experience',
    avatar: 'https://example.com/avatars/jane.jpg',
    email: 'jane@example.com',
    hash: 'hashed_password_2',
    accessToken: 'access_token_2',
    createdAt: '2025-01-02T00:00:00Z',
    updatedAt: '2025-01-02T00:00:00Z',
  },
];
