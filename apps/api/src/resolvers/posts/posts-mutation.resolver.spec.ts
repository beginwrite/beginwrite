import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { PostsRepository } from '../../domains/posts/repositories/posts.repository';
import { CreatePostUseCase } from '../../domains/posts/use-cases/create-post/create-post.use-case';
import { DeletePostUseCase } from '../../domains/posts/use-cases/delete-post/delete-post.use-case';
import { DestroyPostUseCase } from '../../domains/posts/use-cases/destroy-post/destroy-post.use-case';
import { PublishPostUseCase } from '../../domains/posts/use-cases/publish-post/publish-post.use-case';
import { UpdatePostUseCase } from '../../domains/posts/use-cases/update-post/update-post.use-case';

import { PostsMutationResolver } from './posts-mutation.resolver';

describe('PostsMutationResolver', () => {
  let resolver: PostsMutationResolver;
  let createPostUseCase: CreatePostUseCase;
  let publishPostUseCase: PublishPostUseCase;
  let updatePostUseCase: UpdatePostUseCase;
  let deletePostUseCase: DeletePostUseCase;
  let destroyPostUseCase: DestroyPostUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsMutationResolver,
        {
          provide: PostsRepository,
          useValue: createMock<PostsRepository>(),
        },
        {
          provide: CreatePostUseCase,
          useValue: createMock<CreatePostUseCase>(),
        },
        {
          provide: PublishPostUseCase,
          useValue: createMock<PublishPostUseCase>(),
        },
        {
          provide: UpdatePostUseCase,
          useValue: createMock<UpdatePostUseCase>(),
        },
        {
          provide: DeletePostUseCase,
          useValue: createMock<DeletePostUseCase>(),
        },
        {
          provide: DestroyPostUseCase,
          useValue: createMock<DestroyPostUseCase>(),
        },
      ],
    }).compile();

    resolver = module.get<PostsMutationResolver>(PostsMutationResolver);
    createPostUseCase = module.get<CreatePostUseCase>(CreatePostUseCase);
    publishPostUseCase = module.get<PublishPostUseCase>(PublishPostUseCase);
    updatePostUseCase = module.get<UpdatePostUseCase>(UpdatePostUseCase);
    deletePostUseCase = module.get<DeletePostUseCase>(DeletePostUseCase);
    destroyPostUseCase = module.get<DestroyPostUseCase>(DestroyPostUseCase);
  });

  it('resolver が定義されている', () => {
    expect(resolver).toBeDefined();
  });

  describe('createPost', () => {
    it('正常に実行される', async () => {
      const args = {
        data: {
          title: 'Test Post',
          content: 'This is a test post content',
          userId: '1',
        },
      };
      await resolver.createPost(args);
      expect(createPostUseCase.execute).toHaveBeenCalledTimes(1);
      expect(createPostUseCase.execute).toHaveBeenCalledWith(args);
    });
  });

  describe('publishPost', () => {
    it('正常に実行される', async () => {
      const args = {
        id: '1',
      };
      await resolver.publishPost(args);
      expect(publishPostUseCase.execute).toHaveBeenCalledTimes(1);
      expect(publishPostUseCase.execute).toHaveBeenCalledWith(args);
    });
  });

  describe('updatePost', () => {
    it('正常に実行される', async () => {
      const args = {
        id: '1',
        data: {
          title: 'Updated Post Title',
          content: 'Updated post content',
          userId: '1',
        },
      };
      await resolver.updatePost(args);
      expect(updatePostUseCase.execute).toHaveBeenCalledTimes(1);
      expect(updatePostUseCase.execute).toHaveBeenCalledWith(args);
    });
  });

  describe('deletePost', () => {
    it('正常に実行される', async () => {
      const args = {
        id: '1',
      };
      await resolver.deletePost(args);
      expect(deletePostUseCase.execute).toHaveBeenCalledTimes(1);
      expect(deletePostUseCase.execute).toHaveBeenCalledWith(args);
    });
  });

  describe('destroyPost', () => {
    it('正常に実行される', async () => {
      const args = {
        id: '1',
      };
      await resolver.destroyPost(args);
      expect(destroyPostUseCase.execute).toHaveBeenCalledTimes(1);
      expect(destroyPostUseCase.execute).toHaveBeenCalledWith(args);
    });
  });
});
