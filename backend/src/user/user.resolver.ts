import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserInput } from './dto/createUser.input';
import { GetUserArgs } from './dto/getUser.args';
import { User as UserModel } from './model/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return await this.userService.getUser(getUserArgs.email);
  }

  @Mutation(() => UserModel)
  async CreateUser(
    @Args('createUserInput') CreateUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(CreateUserInput);
  }
}
