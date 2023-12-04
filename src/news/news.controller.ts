import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Res,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Render,
  
} from '@nestjs/common';
import fetch from 'node-fetch';
//import * as http from 'http';
//import * as href from 'http';
import { News, NewsEdit, NewsService } from './news.service';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { CommentsService } from './comments/comments.service';
import { renderNewsAll } from '../views/news/news-all';
import { renderTemplate } from '../views/template';
import { renderNewsDetail } from '../views/news/news-detail';
import { CreateNewsDto } from './dtos/create-news-dto';
import { EditNewsDto } from './dtos/edit-news-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from '../utils/HelperFileLoader';
import { MailService } from '../mail/mail.service';
import { Console } from 'console';
import { NewsEntity } from './news.entity';
//import { NewsCreateDto } from '../users/dto/user-create.dto'

const PATH_NEWS = '/news-static/';
HelperFileLoader.path = PATH_NEWS;

@Controller('blog/news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  //*/
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  //*/
  async create1(
    @Body() news/*: CreateNewsDto*/,
    @UploadedFile() cover: Express.Multer.File    ) {
      //console.log('NewsController post() news ', news);
      //return;
      const userId = parseInt(news.userId);//** */
      const categoryId = Number(1);//** */
    // Поиск пользователя по его ID
    const _user = await this.usersService.getuser(/*news.authorId*/userId);
    if (!_user) {
    throw new HttpException(
    'Не существует такого автора',
    HttpStatus.BAD_REQUEST,
    );
    }
    // Поиск категории по её ID
    const _category = await this.categoriesService.findById(/*news.*/categoryId);
    if (!_category) {
    throw new HttpException(
    'Не существует такой категории',
    HttpStatus.BAD_REQUEST,
    );
    }
    const _newsEntity = new NewsEntity();
    //console.log('cover.filename ', cover.filename);
    //  console.log('news ', news);
    //  console.log('cover ', cover);
    if (cover) {
    _newsEntity.cover = PATH_NEWS + cover.filename;
    //console.log('_newsEntity.cover ', _newsEntity.cover);
    }
    //_newsEntity.cover = news.cover;
    _newsEntity.title = news.title;
    _newsEntity.description = news.description;
    // Добавление пользователя в связь
    _newsEntity.user = _user;
    // Добавление категории в связь
    _newsEntity.category = _category;
    //console.log('_newsEntity ', _newsEntity);
    const _news = await this.newsService.create(_newsEntity);
    // await this.mailService.sendNewNewsForAdmins(
    // ['abram1312@yandex.ru'],
    // _news,
    // );
    return _news;
    }

    @Post('/edit')
    @UseInterceptors(
      FileInterceptor('cover', {
        storage: diskStorage({
          destination: HelperFileLoader.destinationPath,
          filename: HelperFileLoader.customFileName,
        }),
      }),
    )
    async edit1(
      @Body() news/*: CreateNewsDto*/,
      @UploadedFile() cover: Express.Multer.File    ) {
      
      const _newsEntity = await this.newsService.findById(news.id)/*new NewsEntity()*/;
      //console.log('cover.filename ', cover.filename);
      //  console.log('news ', news);
      //  console.log('cover ', cover);
      if (cover) {
        if(_newsEntity.cover){
          let fs = require('fs');
          fs.unlink('./public'+_newsEntity.cover, err => {
            if(err) console.log('Нет файла'); else //throw err; // не удалось удалить файл
            console.log('Файл успешно удалён');
          });
        }
      _newsEntity.cover = PATH_NEWS + cover.filename;
      //console.log('_newsEntity.cover ', _newsEntity.cover);
      }
      //_newsEntity.cover = news.cover;
      _newsEntity.title = news.title;
      _newsEntity.description = news.description;
      // Добавление пользователя в связь
      //_newsEntity.user = _user;
      // Добавление категории в связь
      //_newsEntity.category = _category;
      //console.log('_newsEntity ', _newsEntity);
      const _news = await this.newsService.edit(_newsEntity);
      // await this.mailService.sendEdit(
      // ['abram1312@yandex.ru'],
      // JSON.stringify(_newsEntity),
      // );
      return _news;
      }


  @Get('/api/detail/:id')
  //@Render('news-detail')
  //get(@Param('id') id: string)
  async getid1(@Param('id') id: string) {
    const idInt = parseInt(id);
    const news = await this.newsService.findById(idInt);
    news.user = await this.usersService.getuser(news.userId);
    //console.log('detailnews api', news);
    return  news ;
  }
  //  {
    
  //   var _newsEntity = new NewsEntity();
  //   const idInt = parseInt(id);
  //   const news =  this.newsService.findById(idInt);
  // //   news.then((x) => {
  // //     console.log('then ', x); // 'originalResult'
  // //     return {x};
  // // });
  //   console.log("news-detailnews", news);
  //   //_newsEntity.title =  news.then
  //   const newsThen = news.then;
  //   console.log("news-detail", _newsEntity);
  //   console.log("newsThen", newsThen);
    
  //   //const comments = this.commentsService.find(idInt);
  //   //console.log("comments", comments);
  //   // return {
  //   //   //...news,
  //   //   //comments,
  //   // };
  // }

  @Get('/api/all')
  getAll(): News[] {
    //console.log('getAll');
    const news = this.newsService.getAll();
    //console.log(news);
    return news;
  }

  @Get('/api/user/:idUser')
  async getUser(@Param('idUser') idUser: string ) {
    // console.log('getUser');
    // console.log('controller news getUser idUser ', idUser);
    const idUserInt = parseInt(idUser);
    const news = await this.newsService.findByUser(idUserInt);
    //console.log(news);
    return news;
  }

  @Get('/all')
  @Render('news-list')
  async getAllView() {
    
    const news = await this.newsService.findAll();
    //news.user = await this.usersService.getuser(news.userId);
    news.forEach(async(element) => element.user = 
    (await this.usersService.getuser(element.userId))  );
    //console.log('news ', news);
    return { news, title: 'Список новостей!' };
  }
  @Get('/detail/:id')
  @Render('news-detail')
  async getid(@Param('id') id: string) {
    const idInt = parseInt(id);
    const news = await this.newsService.findById(idInt);
    news.user = await this.usersService.getuser(news.userId);
    //console.log('detailnews ', news);
    return  news ;
  }

  @Get('create/new')
  @Render('create-news')
  
  async createView() {
    //console.log('create/new(get)');
    return {};
  }


  @Get('edit/new')
  @Render('edit-news')
  
  async editView() {
    //console.log('create/new(get)');
    return {};
  }

  @Get('/edit/:id')
  @Render('edit-news')
  async edit(@Param('id') id: string) {
    const idInt = parseInt(id);
    const news = await this.newsService.findById(idInt);
    //console.log('controller news edit ', news);
    //const users = await this.usersService.getusers();
    //console.log('controller news edit ', users);
    
    return  {news/*, users*/} ;
  }

  @Get('/registr')
  
  @Render('registr')
  async registr(/*@Param('id') id: string*/) {
    var generator = require('generate-password');
      var password = generator.generate({
      length: 8,
      numbers: true
    });
    // const idInt = parseInt(id);
    // const news = await this.newsService.findById(idInt);
    // console.log('controller news edit ', news);
    //const users = await this.usersService.getusers();
    //console.log('controller news edit ', users);
    //@Render('registr-err')
    let users = [];
    let usersEmail = [];
    users = await this.usersService.usersAll();
    users.forEach(e => {usersEmail.push(e.email)});
    //console.log('controller news registr usersEmail ', usersEmail);
    return  {password, usersEmail} ;
    
  }

  @Post('/registr')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
    async createUser(
      @Body() regisrForm/*: UserCreateDto*/,
      @UploadedFile() avatar: Express.Multer.File){
      //console.log('users.controller post /registr regisrForm ', regisrForm);
      if (avatar) {
        // if(_newsEntity.cover){
        //   let fs = require('fs');
        //   fs.unlink('./public'+_newsEntity.cover, err => {
        //     if(err) console.log('Нет файла'); else //throw err; // не удалось удалить файл
        //     console.log('Файл успешно удалён');
        //   });
        // }
      //   const _registrForm = {};
      // _registrForm.cover = PATH_NEWS + cover.filename;
       //console.log('avatar ', avatar);
      }
    }
  
    @Get('/auth')
    @Render('auth')
    async auth()  {}


  @Get('/registr/err')
  @Render('registr-err')
  async registrErr(/*@Param('id') id: string*/) {
    // const idInt = parseInt(id);
    // const news = await this.newsService.findById(idInt);
     //console.log('controller news registr/err ');
    //const users = await this.usersService.getusers();
    //console.log('controller news edit ', users);
    
    
    return  {/*news, users*/} ;
  }

  @Post('/registr/email')
    async sendCod(@Body() emailObj){
      //var generator = require('generate-password');
      //var password = generator.generate({
      //length: 8,
      //numbers: true
    //});
	var password = emailObj.password;
    var email: string = emailObj.email;
    //const cod = generator.generate(8);
    var res
    //console.log('controller news registr emailObj ', emailObj, ' email ', email);
    res = await this.mailService.sendRegistrForUser(
    email,
    password,
    );
    //console.log('controller news registr res ', res);
    ///*const response = */await fetch('http://localhost:3000/news/registr/err', {method: 'GET'});
    //const data = await response.json();
    //console.log(data);
    //location = //l.com;
    //href = `http://localhost:3000/news/registr/err`;
    // @Render('registr')
    // function errEmail(){}
    ///*if(!res)*/ return 'email не существует'
    }

  @Post('/api')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )


  //test() {console.log('postapi');}

  async create(
    @Body() news: CreateNewsDto,
    @UploadedFile() cover,
  ): Promise<News> {
    const fileExtension = cover.originalname.split('.').reverse()[0];
    if (!fileExtension || !fileExtension.match(/(jpg|jpeg|png|gif)$/)) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Неверный формат данных',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (cover?.filename) {
      news.cover = PATH_NEWS + cover.filename;
    }

         const userId = Number(1);//** */
      const categoryId = Number(1);//** */
    // Поиск пользователя по его ID
    const _user = await this.usersService.getuser(/*news.authorId*/userId);
    if (!_user) {
    throw new HttpException(
    'Не существует такого автора',
    HttpStatus.BAD_REQUEST,
    );
    }
    // Поиск категории по её ID
    const _category = await this.categoriesService.findById(/*news.*/categoryId);
    if (!_category) {
    throw new HttpException(
    'Не существует такой категории',
    HttpStatus.BAD_REQUEST,
    );
    }

    const _newsEntity = new NewsEntity();
    _newsEntity.title = news.title;
    _newsEntity.description = news.description;
    _newsEntity.user = _user;
    _newsEntity.category = _category;
    _newsEntity.cover = news.cover;
    //console.log('_newsEntity ', _newsEntity);

     const createdNews = await this.newsService.create(/*news*/_newsEntity);
    // await this.mailService.sendNewNewsForAdmins(
    //   [
    //     'abram1312@yandex.ru',
                
    //     ],
    //   createdNews,
    // );
    return /*createdNews*/;
  }


  @Get('delete/:id')
  @Render('news-delete')
  async delete(@Param('id') id: string) {
    const idInt = parseInt(id);
    const _newsEntity = await this.newsService.findById(idInt)/*new NewsEntity()*/;
    //console.log('NewsController get delete id _newsEntity ', _newsEntity);
    return _newsEntity;
  }

  

  @Delete('/api/:id')
  async remove(@Param('id') id: string)/*: string*/ {
    const idInt = parseInt(id);
	const comments = await this.commentsService.find(id);
	comments.forEach(e =>  this.commentsService.remove(e.id));
    const _newsEntity = await this.newsService.findById(idInt)/*new NewsEntity()*/;
    if(_newsEntity.cover){
      let fs = require('fs');
      fs.unlink('./public'+_newsEntity.cover, err => {
        if(err) /*throw err*/console.log('не удалось удалить файл'); // не удалось удалить файл
        //console.log('Файл успешно удалён');
      });
    }
    const isRemoved = await this.newsService.remove(idInt);
    return isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор';
  }
}
