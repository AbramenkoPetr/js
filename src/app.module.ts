import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { CommentsModule } from './news/comments/comments.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule }  from './users/users.module';
import { CategoriesModule }  from './categories/categories.module';
// console.log('__dirname ', __dirname);
// const dirname1 = join(__dirname, '../..', 'views');
// console.log('dirname1 ', dirname1);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1312',
      database: 'my_news_blog',
      entities: ["dist/**/*.entity{.ts, .js}"],
      synchronize: true,
      autoLoadEntities: true,
    }),
    
    ServeStaticModule.forRoot({
      
      rootPath: join(__dirname, '../', 'public'),
    }),
    NewsModule,
    MailModule,
    UsersModule,
    CategoriesModule,
    CommentsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
