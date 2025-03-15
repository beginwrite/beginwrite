import { FileUpload } from 'graphql-upload-minimal';
import { User } from 'src/domains/users/entities/users.entity';
import { UsersRepository } from 'src/domains/users/repositories/users.repository';

export class UpdateUserProfileAvatarUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string, file: FileUpload): Promise<User> {
    if (!file) throw new Error('File is required');
    const user = await this.usersRepository.findById(id);
    return this.usersRepository
      .uploadProfileAvatar(file, Number(id), user.avatar)
      .then(async () => {
        return await this.usersRepository.findById(id);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.message);
      });
  }
}
