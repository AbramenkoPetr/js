import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
//import { UsersService } from 'src/users/users.service';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from '../mail/mail.module';
import { NewsEntity } from './news.entity';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
  //  /*forwardRef(() =>*/ CommentsModule/*) */,
    
    TypeOrmModule.forFeature([NewsEntity]),  
    CommentsModule,
    MailModule,
    UsersModule,
    CategoriesModule
  ],
  //exports: [NewsService],
})
export class NewsModule {}
