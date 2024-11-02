import { Controller, Get, Post, Param, Body, Res, HttpStatus, HttpException  } from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from '../common/dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  async createUser(@Res({ passthrough: true }) res: Response, @Body() createUserDto: CreateUserDto) {
    console.log('This action creates a user')
    
    try {
      await this.usersService.create(createUserDto);
      res.status(HttpStatus.OK);
    } catch (error) {
      res.status(HttpStatus.CONFLICT);
    }
  }

  @Post('/login')
  async login(@Res({ passthrough: true }) res: Response, @Body() createUserDto: CreateUserDto) {
    console.log('This action is login')
    
    try {
      const user = await this.usersService.findByUsername(createUserDto.name);
      if (user && user.password === createUserDto.password) {
        res.status(HttpStatus.OK);
      } else {
        res.status(HttpStatus.NOT_FOUND);
      }
      
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Get()
  // async findByUserName(@Res({ passthrough: true }) res: Response, @Body() userName: string) {
  //   try {
  //     const user = await this.usersService.findByUsername(userName);
  //     if(user) {
  //       res.status(HttpStatus.FOUND);
  //     } else {
  //       res.status(HttpStatus.NOT_FOUND);
  //     }
  //     res.status(HttpStatus.OK);
  //   } catch (error) {
  //     res.status(HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
  // @Get()
  // findAll() {
  //   return 'This action returns all cats';
  // }

  // @Get(':id')
  // findOne(@Param() params: any): string {
  //   console.log("id: ", params.id);
  //   return `This action returns a #${params.id} user`;
  // }


  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return `This action removes a #${id} cat`;
  // }
}
