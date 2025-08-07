import { createMock } from '@golevelup/ts-vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PostsRepository } from 'src/infrastructure/repositories/posts.repository';

import { CreatePostUseCase } from './create-post.use-case';

describe('CreatePostUseCase', () => {
  let useCase: CreatePostUseCase;
  let postsRepository: PostsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePostUseCase,
        {
          provide: PostsRepository,
          useValue: createMock<PostsRepository>(),
        },
      ],
    }).compile();
    useCase = module.get<CreatePostUseCase>(CreatePostUseCase);
    postsRepository = module.get<PostsRepository>(PostsRepository);
  });

  it('use-case が定義されている', () => {
    expect(useCase).toBeDefined();
  });

  it('投稿処理が正常に実行される', async () => {
    const mockCreatePostArgs = {
      data: {
        title: 'Test Post',
        content: 'This is a test post content.',
        userId: '1',
      },
    };

    const mockPost = {
      id: 1,
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Test Post',
      content: 'This is a test post content.',
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    postsRepository.createPost = vi.fn().mockResolvedValue(mockPost);

    const result = await useCase.execute(mockCreatePostArgs);

    expect(postsRepository.createPost).toHaveBeenCalledWith(
      mockCreatePostArgs.data,
    );
    expect(result).toEqual(mockPost);
  });
});
