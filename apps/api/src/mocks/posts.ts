import { Post } from '../domains/entities/posts.entity';

import { mockUsers } from './users';

export const mockPosts: Post[] = [
  {
    id: 1,
    uuid: '123e4567-e89b-12d3-a456-426614174001',
    title: 'Getting Started with NestJS',
    content:
      'NestJS is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.',
    userId: 1,
    user: mockUsers[0],
    publishedAt: '2025-01-01T00:00:00Z',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: 2,
    uuid: '223e4567-e89b-12d3-a456-426614174002',
    title: 'GraphQL with NestJS',
    content:
      'Learn how to integrate GraphQL with NestJS to build a modern API.',
    userId: 1,
    user: mockUsers[0],
    publishedAt: '2025-01-02T00:00:00Z',
    createdAt: '2025-01-02T00:00:00Z',
    updatedAt: '2025-01-02T00:00:00Z',
    deletedAt: null,
  },
  {
    id: 3,
    uuid: '323e4567-e89b-12d3-a456-426614174003',
    title: 'React Hooks Deep Dive',
    content:
      'Understanding React Hooks and how to use them effectively in your applications.',
    userId: 2,
    user: mockUsers[1],
    publishedAt: '2025-01-03T00:00:00Z',
    createdAt: '2025-01-03T00:00:00Z',
    updatedAt: '2025-01-03T00:00:00Z',
    deletedAt: null,
  },
];
