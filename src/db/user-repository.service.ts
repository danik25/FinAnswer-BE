import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity'
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async insertUser(userName: string, password: string): Promise<void> {

    // TODO: Check if the recode already exists, if so, update it
    const newUser = this.usersRepository.create({userName, password});
    this.usersRepository.save(newUser);

  }

  async findByUsername(userName: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne({ where: { userName } });
  }
}