//import { Controller } from '@nestjs/common';
import { Body, Controller, Get, Post, Render, 
    Patch, UseGuards, Req, ParseIntPipe,
    HttpException, Param, HttpStatus, UploadedFile,
    UseInterceptors, 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { NewsService } from '../news/news.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EditUserDto } from './dto/edit-user-dto';
import { HelperFileLoader } from '../utils/HelperFileLoader';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Role } from 'src/auth/role/role.enum';
import { hash,  } from '../utils/crypto';
const  bcrypt  =  require ( 'bcrypt' ) ; 
// /*export*/ enum RoleType {
//   //ADMIN = 'ADMIN',
//   USER = 'user',
// }

const PATH_NEWS = '/news-static/';
HelperFileLoader.path = PATH_NEWS;

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Post()
    async create(@Body() user: UserCreateDto): Promise<UsersEntity> {
        //console.log('UsersController user ', user); 
    return this.usersService.create(user);
    }
//     @Get()
//     //@Render('create-news')
//     getAllView() {
//         //const news = this.newsService.getAll();
//         console.log('news');
//         //return { news, title: 'Список новостей!' };
//       }
    @Get()
    async getuser() {
        const user = await this.usersService.getuser(1);
        //console.log('UsersController user ', user);  
    }

    @Get('edit-profile/:id')
  @Render('edit-profile1')
  async renderEditProfile(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const _user = await this.usersService.getuser(id);
    if (!_user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Неверный идентификатор пользователя',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    //console.log('UsersController user ', _user);
    return {_user};
  }

    @Patch('api')
  //@UseGuards(JwtAuthGuard)
  async edit(@Body() user /*: EditUserDto @Req() req*/) {
    //console.log('users controller patch api user ', user);
    //const jwtUserId = req.user.userId;
    return /*this.usersService.edit(jwtUserId,*/ user/*)*/;
  }
  @Post('api')
  @UseGuards(JwtAuthGuard)
  /*async*/ edit1(@Body() _user : EditUserDto, @Req() req, 
  /*@UploadedFile() cover: Express.Multer.File*/ ) {
    
    const user = /*await*/ _user;
    //console.log('users controller post api user ', _user);
    const jwtUserId = Number(_user.id)/*req.user.userId*/;
    return this.usersService.edit(jwtUserId, _user);
  }

  // @Post('/registr')
  // @UseInterceptors(
  //   FileInterceptor('avatar', {
  //     storage: diskStorage({
  //       destination: HelperFileLoader.destinationPath,
  //       filename: HelperFileLoader.customFileName,
  //     }),
  //   }),
  // )
  //   async createUser(
  //     @Body() regisrForm: UserCreateDto,
  //     @UploadedFile() avatar: Express.Multer.File){
  //     console.log('users.controller post /registr regisrForm ', regisrForm);
  //     if (avatar) {
  //       // if(_newsEntity.cover){
  //       //   let fs = require('fs');
  //       //   fs.unlink('./public'+_newsEntity.cover, err => {
  //       //     if(err) console.log('Нет файла'); else //throw err; // не удалось удалить файл
  //       //     console.log('Файл успешно удалён');
  //       //   });
  //       // }
  //     //   const _registrForm = {};
  //     // _registrForm.cover = PATH_NEWS + cover.filename;
  //      console.log('cover ', avatar);
  //     }
  //   }

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
      console.log('users.controller post /registr regisrForm ', regisrForm);
      // enum Role {
      //   //ADMIN = 'ADMIN',
      //   USER = 'user',
      // }
      //const role = RoleType ('user');
      const _user = new UserCreateDto;
      _user.firstName = regisrForm.firstName;
      _user.lastName = regisrForm.lastName;
      _user.email = regisrForm.email;
      _user.password = regisrForm.password;
      _user.roles = Role.User;
      if (avatar) {
        // if(_newsEntity.cover){
        //   let fs = require('fs');
        //   fs.unlink('./public'+_newsEntity.cover, err => {
        //     if(err) console.log('Нет файла'); else //throw err; // не удалось удалить файл
        //     console.log('Файл успешно удалён');
        //   });
        // }
      //   const _registrForm = {};
      _user.avatar = PATH_NEWS + avatar.filename;
       //console.log('avatar ', avatar);
      }
      //return _user;
      //localStorage.setItem('user', JSON.stringify(_user));
      return this.usersService.create(_user);
    }

    @Post('/auth')
    async auth(@Body() regisrForm, )  {
      //console.log('users controller post auth regisrForm ', regisrForm);
      const _user = new UserCreateDto;
      _user.email = regisrForm.email;
      _user.password = regisrForm.password;
      //console.log('users controller post auth user ', _user);
      const userOrig = await this.usersService.findByEmail(_user.email);
      //console.log('users controller post auth userOrig ', userOrig);

      // const passHash = await hash(_user.password);
      // console.log('users controller post auth usOriPas ', userOrig.password);
      // console.log('users controller post auth passHash ', passHash);
      // let ret = false;
      // // function test(err, result){if(result) ret = true;};
      // // bcrypt.compare(/*_user.password*/'1111', userOrig.password,  test ( err ,  result ))
      // bcrypt.compare(/*_user.password*/'1111', userOrig.password,  function ( err ,  result ){
      //   console.log('users controller post auth result ', result, err);
      //   if(result) ret = true;
      //   //console.log('users controller post auth cmpr ', cmpr, ret);
      // });
      const comp = bcrypt.compareSync ( _user.password ,  userOrig.password ) ;
      //await console.log('users controller post auth cmpr ', cmpr, ret);
      //if(_user.password === userOrig.password)
      //setTimeout({console.log('users controller post auth cmpr ', cmpr, ret)}, 1000);
      //console.log('users controller post auth cmpr ', comp);
      return await {comp, userOrig};
    }


    @Post('/delete/:id')
    async delete(
      @Param('id') id: string
    ){
      const userInt = parseInt(id);
      const user = await this.usersService.getuser(userInt);
      //console.log('users controller post delete user ', user);

      if(user.avatar){
        let fs = require('fs');
        fs.unlink('./public'+user.avatar, err => {
          if(err) throw err; // не удалось удалить файл
          //console.log('Файл успешно удалён');
        });
      }
      const isRemoved = await this.usersService.remove(user);
    return isRemoved ? 'Пользватель удален' : 'Передан неверный идентификатор';
      //return user;
    }
 }
