import { gql } from '@apollo/client';

import type { IPost } from '@beginwrite/app-graphql-codegen';

export type GetPostQuery = {
  post: Pick<IPost, 'id' | 'title' | 'content' | 'user'>;
};

export const getPostQuery = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      user
    }
  }
`;

export type UpdatePostMutation = {
  updatePost: Pick<IPost, 'id' | 'title' | 'content'>;
};

export const updatePostMutation = gql`
  mutation UpdatePost($id: ID!, $data: PostInput!) {
    updatePost(id: $id, data: $data) {
      id
      title
      content
    }
  }
`;
