import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { FindPostByIdUseCase } from 'src/domains/posts/use-cases/find-post-by-id.use-case';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { PostsRepository } from '../../domains/posts/repositories/posts.repository';

import { PostsQueryResolver } from './posts-query.resolver';

describe('PostsQueryResolver', () => {
  let resolver: PostsQueryResolver;
  let findPostByIdUseCase: FindPostByIdUseCase;
  let postsRepository: PostsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsQueryResolver,
        {
          provide: PostsRepository,
          useValue: createMock<PostsRepository>(),
        },
        {
          provide: FindPostByIdUseCase,
          useValue: createMock<FindPostByIdUseCase>(),
        },
      ],
    }).compile();

    resolver = module.get<PostsQueryResolver>(PostsQueryResolver);
    findPostByIdUseCase = module.get<FindPostByIdUseCase>(FindPostByIdUseCase);
    postsRepository = module.get<PostsRepository>(PostsRepository);
  });

  it('resolver が定義されている', () => {
    expect(resolver).toBeDefined();
  });

  describe('posts', () => {
    it('正常に実行される', async () => {
      await resolver.posts();
      expect(postsRepository.findAll).toHaveBeenCalledTimes(1);
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
