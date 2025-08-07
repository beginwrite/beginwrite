import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { FindPostByIdUseCase } from '../../use-cases/posts/find-post-by-id/find-post-by-id.use-case';
import { FindPostsByUserIdUseCase } from '../../use-cases/posts/find-posts-by-user-id/find-posts-by-user-id.use-case';

import { PostsQueryResolver } from './posts-query.resolver';

describe('PostsQueryResolver', () => {
  let resolver: PostsQueryResolver;
  let findPostByIdUseCase: FindPostByIdUseCase;
  let findPostsByUserIdUseCase: FindPostsByUserIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsQueryResolver,
        {
          provide: FindPostByIdUseCase,
          useValue: createMock<FindPostByIdUseCase>(),
        },
        {
          provide: FindPostsByUserIdUseCase,
          useValue: createMock<FindPostsByUserIdUseCase>(),
        },
      ],
    }).compile();

    resolver = module.get<PostsQueryResolver>(PostsQueryResolver);
    findPostByIdUseCase = module.get<FindPostByIdUseCase>(FindPostByIdUseCase);
    findPostsByUserIdUseCase = module.get<FindPostsByUserIdUseCase>(
      FindPostsByUserIdUseCase,
    );
  });

  it('resolver が定義されている', () => {
    expect(resolver).toBeDefined();
  });

  describe('posts', () => {
    it('正常に実行される', async () => {
      await resolver.posts('1');

      expect(findPostsByUserIdUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findPostsByUserIdUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('post', () => {
    it('正常に実行される', async () => {
      const postId = '1';
      await resolver.post(postId);

      expect(findPostByIdUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findPostByIdUseCase.execute).toHaveBeenCalledWith(postId);
    });

    it('存在しないIDを指定したらエラーが出る', async () => {
      const postId = '999';

      await resolver.post(postId);

      expect(findPostByIdUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findPostByIdUseCase.execute).toHaveBeenCalledWith(postId);
    });
  });
});
