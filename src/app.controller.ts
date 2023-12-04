import { Controller, Request, Post, UseGuards, Get, Render } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {} //*
  //@UseGuards(LocalAuthGuard/*AuthGuard('local')*/)
  @Post('auth/login')
  async login(@Request() req) {
    //return req.user;
    //console.log('app.contr post auth/login req.body ',req.body);
    return this.authService.login(req.body/*user*/);  //*
  }
  @UseGuards(/*AuthGuard('local')*/JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    //console.log('app.contr post auth/login req.body ', req, ' ', req.body);
    return req./*body*/user;
  }

  @Get('/blog')
  @Render('start-list')
  root() {
  //console.log('getstart');
  return {
    //messages: [{ message: 'Hello', author: 'Vlad' }, { message: 'World', author: 'Vlad' }],
  };
}
}


// import { Controller, Get, Render } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller('/')
// export class AppController {
//   constructor(private readonly appService: AppService) { }
// @Get()
// @Render('start-list')
// root() {
// //console.log('getstart');
//   return {
//     //messages: [{ message: 'Hello', author: 'Vlad' }, { message: 'World', author: 'Vlad' }],
//   };
// }


//}
