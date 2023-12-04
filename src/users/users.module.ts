import { forwardRef,Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersService } from './users.service';
//import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
//import { PostsController } from './users.controller.ts/posts/posts.controller';
//import { UsersController } from './users/users.controller';
import { UsersController } from './users.controller';
//import { RolesGuard } from '../auth/role/roles.guard';
import { AuthModule } from '../auth/auth.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity]),
        forwardRef(() => AuthModule),
    ],
providers: [UsersService],

controllers: [UsersController],

exports: [UsersService, TypeOrmModule.forFeature([UsersEntity])],
})
export class UsersModule {}

