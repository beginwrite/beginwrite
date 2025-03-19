import { gql } from '@apollo/client';

import type { IPost } from '@beginwrite/graphql-codegen';

export type CreatePostMutation = {
  createPost: Pick<IPost, 'id' | 'title' | 'content'>;
};

export const createPostMutation = gql`
  mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
      id
      title
      content
    }
  }
`;
