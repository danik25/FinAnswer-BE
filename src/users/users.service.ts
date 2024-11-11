
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UserEntity } from '../common/entities/user.entity'
import { CreateUserDto } from '../common/dto/create-user.dto';
import { UsersRepositoryService } from 'src/db/user-repository.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService
  ) {}

  async create(user: CreateUserDto) {
    try {
        const userInDB = await this.findByUsername(user.name)

        if(userInDB) {
          throw new HttpException("user already taken!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        this.usersRepositoryService.insertUser(user.name, user.password, user.email);

    } catch(e) {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }

  async findByUsername(userName: string): Promise<UserEntity | undefined> {
    return this.usersRepositoryService.findByUsername(userName);
  }
}
