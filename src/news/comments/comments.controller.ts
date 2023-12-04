import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Render,
  
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { CommentsService } from './comments.service';
import { UsersService } from '../../users/users.service';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { EditCommentDto } from './dtos/edit-comment-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoader } from '../../utils/HelperFileLoader';

const PATH_NEWS = '/news-static/';
HelperFileLoader.path = PATH_NEWS;
//CommentsService.create1()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService,
    private readonly usersService: UsersService) {}
  
  @Get('create/comment')
  @Render('create-comment')
  async createView() {
    return {};
  }
  @Post('/api/:idNews')
  //@Render('create-comment')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  create(
    @Param('idNews') idNews: string,
    @Body() comment: CreateCommentDto,
    //@UploadedFile() avatar: Express.Multer.File,
  ) {
    // if (avatar?.filename) {
    //   comment.avatar = PATH_NEWS + avatar.filename;
    // }
    //console.log("CommentsController create comment ", comment);
    const idNewsInt = parseInt(idNews);
    const idUser = parseInt(comment.idUser);
    //return
    return this.commentsService.create(idNewsInt, comment.message, idUser);
  }

  @Get('/edit/:idComment')
  @Render('edit-comment')
  async edit1(@Param('idComment') idComment: string){
    const id = parseInt(idComment);
    //console.log('comments_controller edit id ', id);
    //var comment = []
    var comment = await this.commentsService.findComment(id);
    //console.log('comments_controller edit comment ', comment);
    return {comment};
  }

  @Post('/edit')
  edit2(
    //@Param('idNews') idNews: string,
    @Param('idComment') idComment: string,
    @Body() comment/*: EditCommentDto,*/
  ) {
    //console.log('comments_controller edit Put id comment', comment);
    const idCommentInt = parseInt(comment.idComment);
    //const idCommentInt = parseInt(comment.idComment);
    return this.commentsService.edit(idCommentInt, comment);
  }

  @Put('/api/:idComment')
  edit(
    //@Param('idNews') idNews: string,
    @Param('idComment') idComment: string,
    @Body() comment: EditCommentDto,
  ) {
    //const idNewsInt = parseInt(idNews);
    const idCommentInt = parseInt(idComment);
    return this.commentsService.edit(idCommentInt, comment);
  }

  @Get('/api/details/:idNews')
  @Render('comments-list')
  async get(@Param('idNews') idNews: string/*, @Param('idUser') idUser: string*/){
    //console.log('/api/details/:idNews idUser ', idUser);
    //const userId = Number(1);
    const idNewsInt = parseInt(idNews);
    //console.log('/api/details/:idNews', this.commentsService.find(idNewsInt));
    //console.log('/api/details/:idNews', idNews);
    const comments = await this.commentsService.find(idNewsInt);
    //console.log('/api/details/:idNews comments ', comments);
    //const user =
    //const avatar = (await this.usersService.getuser(userId)).avatar;
    //comments.avatar
    //comments.forEach((element) => element.avatar = avatar);
    //console.log('/api/details/:idNews comments ', comments);
    comments.forEach(async(element) => {
      var user1 = await this.usersService.getuser(element.userId);
      const firstName = user1.firstName;
      const lastName = user1.lastName;
      //console.log('/api/details/:idNews firstName ', firstName+ ' ' + lastName);
      element.author = firstName + ' ' + lastName;
      //console.log('/api/details/:idNews element.author ', element.author);
    // (await this.usersService.getuser((element.userId))).firstName + ' ' +
    // (await this.usersService.getuser(element.userId)).lastName;
    });
    //console.log('comments_controller api/detail comments', comments);
    return /*this.commentsService.find(idNewsInt)*/{comments};
  }

  @Delete('/api/details/:idComment')
  remove(
    //@Param('idNews') idNews: string,
    @Param('idComment') idComment: string,
  ) {
    //console.log('comments_controller api/detail delete id', idComment);
    //const idNewsInt = parseInt(idNews);
    const idCommentInt = parseInt(idComment);
    return this.commentsService.remove(idCommentInt);
  }

  @Get('/delete/:idComment/:newsId')
  @Render('delete-comment')
  async delete(@Param('idComment') idComment: string, @Param('newsId') newsId: string){
    const id = parseInt(idComment);
    // console.log('comments_controller delete id ', idComment);
    // console.log('comments_controller delete idnews ', newsId);
    const idCommentInt = parseInt(idComment);
    const newsIdInt = parseInt(newsId);
    //var comment = []
     var comment = await this.commentsService.findComment(id);
    // console.log('comments_controller edit comment ', comment);
    //return {comment};
    //const remuv = await this.commentsService.remove(idCommentInt);
    //return this.commentsService.remove(idCommentInt);
    return comment /*location.href = 'http://localhost:3000/comments/api/details/{newsIdInt}'*/;
  }

  // @Delete('/delete/:idComment')
  // delete(
  //   //@Param('idNews') idNews: string,
  //   @Param('idComment') idComment: string,
  // ) {
  //   //const idNewsInt = parseInt(idNews);
  //   const idCommentInt = parseInt(idComment);
  //   return this.commentsService.remove(idCommentInt);
  // }
}
