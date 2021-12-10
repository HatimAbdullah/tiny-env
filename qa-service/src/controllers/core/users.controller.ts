import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { UpdatedUserDto } from '../../dtos/users.dto';
import userService from '../../services/users.service';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { User } from '../../models/core/users.model';

@Controller()
export class UsersController {
  public userService = new userService();

  @Get('/users')
  @OpenAPI({ summary: 'Return a list of users' })
  async getUsers() {
    const findAllUsersData: User[] = await this.userService.findAllUser();
    return { data: findAllUsersData, message: 'findAll' };
  }

  @Get('/users/:id')
  @OpenAPI({ summary: 'Return find a user' })
  async getUserById(@Param('id') userId: number) {
    const findOneUserData: User = await this.userService.findUserById(userId);
    return { data: findOneUserData, message: 'findOne' };
  }

  @Put('/users/:id')
  @UseBefore(validationMiddleware(UpdatedUserDto, 'body', true))
  @OpenAPI({ summary: 'Update a user' })
  async updateUser(@Param('id') userId: number, @Body() userData: UpdatedUserDto) {
    const updateUserData: User = await this.userService.updateUser(userId, userData);
    return { data: updateUserData, message: 'updated' };
  }

  @Delete('/users/:id')
  @OpenAPI({ summary: 'Delete a user' })
  async deleteUser(@Param('id') userId: number) {
    const deleteUserData: User = await this.userService.deleteUser(userId);
    return { data: deleteUserData, message: 'deleted' };
  }
}
