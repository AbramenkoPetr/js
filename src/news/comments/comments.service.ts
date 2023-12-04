import {  HttpException, HttpStatus, Injectable,  } from '@nestjs/common';
//import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getRandomInt } from '../news.service';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { CommentsEntity } from './comments.entity';
import { NewsService } from '../news.service';
import { UsersService } from '../../users/users.service';
import { UsersEntity } from 'src/users/users.entity';
import { EventsComment } from './EventsComment.enum';

export type Comment = {
  id?: number;
  message: string;
  author: string;
};

export type CommentEdit = {
  id?: number;
  message?: string;
  author?: string;
};

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(CommentsEntity)
    private  commentsRepository: Repository<CommentsEntity>,
    //private newsService: NewsService,
    //@InjectRepository(UsersEntity)
    private usersService: UsersService,
    ) {}

    private readonly comments: Comment[] = [
    //{id: 1...},
    ];


  // private readonly comments = {
  //    '1': [
  //   { message: 'это коментарий1' ,
  //  id: 111},
  //   { message: 'это коментарий2' , 
  //   id: 222,
  //   author: 'Петр',
  //   avatar: '/news-static/avatar.png' },
  //   { message: 'это коментарий3' , 
  //   id: 333 }
  // ]}



  //** */
  // create1() {
  //   this.comments[1] = [];
  //   const msg = { message: 'Отличная новость',
  //   author: 'Аноним', avatar: ''};
  //   const newComment = {msg , id: 333 };
  //   this.comments[1].push(newComment);
  //   console.log('this.comments', this.comments);
  //   return newComment;
  // }
  //create1()
  //** */

  // async create2(comment: CreateCommentDto): Promise<CommentsEntity>  {
  //   const commentsEntity = new CommentsEntity();
  //   commentsEntity.title = comment.title;
  //   commentsEntity.description =comment.description;
  //   commentsEntity.avatar =news.cover;
  //   //const _user = await this.usersService.getuser(news.userId)
  //   //newsEntity.user = _user;
  //   commentsEntity.userId =Number(1);
  //   //commentsEntity.categoryId =Number(1);
  //   //newsEntity.user = await this.usersService.getuser(newsEntity.userId);
  //   console.log('news ', news);
  //   console.log('newsEntity ', newsEntity);
  //   return await this.newsRepository.save(newsEntity);


  //   const commentEntity = new CommentsEntity();
  //   commentEntity.news = _news;
  //   commentEntity.user = _user;
  //   commentEntity.message = message;
  // }


  // create1(idNews: number, comment: CreateCommentDto) {
  //   //console.log('create')
  //   if (!this.comments[idNews]) {
  //     this.comments[idNews] = [];
  //   }
  //   //console.log('create')
  //   const newComment = { ...comment, id: getRandomInt() };
  //   //console.log('create', this.comments[idNews]);
  //   this.comments[idNews].push(newComment);
  //   //console.log('create', this.comments[idNews]);
  //   return newComment;
  // }

  async create(
    idNews: number,
    message: string,
    idUser: number,
  ): Promise<CommentsEntity> {
    // const _news = await this.newsService.findById(idNews);
    // if (!_news) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.NOT_FOUND,
    //       error: 'Новость не найдена',
    //     },
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    // const _user = await this.usersService.getuser(idUser);
    // if (!_user) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.NOT_FOUND,
    //       error: 'Пользователь не найден',
    //     },
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    const user = this.usersService.getuser(idUser);
    //console.log('CommentsService create user ', user);
    const commentEntity = new CommentsEntity();
    commentEntity.newsId = idNews;
    commentEntity.userId = idUser;
    commentEntity.message = message;
    commentEntity.avatar = (await user).avatar;
    //console.log('CommentsService create commentEntity ', commentEntity);

    return this.commentsRepository.save(commentEntity);
  }
  
  async findComment(idComment: number): Promise<CommentsEntity> {
    const _comment = await this.commentsRepository.findOne({
      where: { id: idComment },
      //relations: ['news', 'user'],
    });
    return _comment;
  }
  async edit(idComment: number, comment: CommentEdit): Promise<CommentsEntity> {
    const _comment = await this.commentsRepository.findOne({
      where: { id: idComment },
      relations: ['news', 'user'],
    });
    //console.log('commentService edit comment ', comment);
    _comment.message = comment.message;

    const _updatedComment = await this.commentsRepository.save(_comment);
    // this.eventEmitter.emit(EventsComment.edit, {
    //   commentId: idComment,
    //   newsId: _comment.news.id,
    //   comment: _updatedComment,
    // });
    return _updatedComment;
  }

  // async edit(idComment: number, comment: CommentEdit): Promise<CommentsEntity> {
  //   const _comment = await this.commentsRepository.findOne({
  //     where: { id: idComment },
  //     relations: ['news', 'user'],
  //   });
  //   _comment.message = comment.message;
  //   const _updatedComment = await this.commentsRepository.save(_comment);
  //   this.eventEmitter.emit(EventsComment.edit, {
  //     commentId: idComment,
  //     newsId: _comment.news.id,
  //     comment: _updatedComment,
  //   });
  //   return _updatedComment;
  // }

  // edit(idNews: number, idComment: number, comment: CommentEdit) {
  //   const indexComment = this.comments[idNews]?.findIndex(
  //     (c) => c.id === idComment,
  //   );

  //   if (!this.comments[idNews] || indexComment === -1) {
  //     return false;
  //   }

  //   this.comments[idNews][indexComment] = {
  //     ...this.comments[idNews][indexComment],
  //     ...comment,
  //   };
  //   return this.comments[idNews][indexComment];
  // }

  // find(idNews: number): CreateCommentDto[] | null {
  //   return this.comments[idNews] || null;
  // }
  async find(idNewsInt): Promise<CommentsEntity[]> {
    const comments = await this.commentsRepository.find({});
    const comments1 = [];
    comments.forEach((e) => {if(e.newsId === idNewsInt) comments1.push(e)});
    //console.log('comments1 ', comments1);
    return comments1;
    }

  // remove(idNews: number, idComment: number): Comment[] | null {
  //   if (!this.comments[idNews]) {
  //     return null;
  //   }

  //   const indexComment = this.comments[idNews].findIndex(
  //     (c) => c.id === idComment,
  //   );
  //   if (indexComment === -1) {
  //     return null;
  //   }
  //   return this.comments[idNews].splice(indexComment, 1);
  // }

  async remove(id: number) {
    //const _comment = await this.find(id);
    const _comment = [];
    const _comments = await this.commentsRepository.find();
    _comments.forEach((e) => {if(e.id === id) _comment.push(e)});
    // console.log('commentsservice remuve _comments ', _comments);
    // console.log('commentsservice remuve _comment ', _comment);
    return await this.commentsRepository.remove(_comment)/*_comment*/;
    }
}
