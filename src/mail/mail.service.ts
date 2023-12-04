import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { News } from '../news/news.service';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendTest() {
    console.log('Отправляется письмо установки');
    const dirTemplates = join(__dirname, '../..', '/src/mail/templates/new-news');
    return await this.mailerService
      .sendMail({
        to: 'abram1312@yandex.ru',
        subject: '🤩 Наше первое письмо!',
        template: './test',
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }


  async sendEdit(email: string[], message) {
    console.log('Отправляется письмо редактирования');
    const dirTemplates = join(__dirname, '../..', '/src/mail/templates/edit-news');
    console.log('message ', message);
    const msg = { message: `${message}` }
    console.log('msg ', msg);
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'Редактирование новости',
        //
        //template: './test1',
        template: dirTemplates,
        context: msg,
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }


  async sendNewNewsForAdmins(emails: string[], news: News) {
    console.log('Отправляются письма о новой новости администрации ресурса');
    const dirTemplates = join(__dirname, '../..', '/src/mail/templates/new-news');
    console.log('__dirname ', __dirname);
    //console.log('dirname1 ', dirname1);
    for (const email of emails) {
      await this.mailerService
        .sendMail({
          to: email,
          subject: `Создана новая новость: ${news.title}`,
          template: dirTemplates,
          context: news,
        })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
  async sendRegistrForUser(email: string, cod) {
    console.log('Отправляется письмо редактирования');
    const dirTemplates = join(__dirname, '../..', '/src/mail/templates/edit-news');
    console.log('cod ', cod);
    const msg = { message: `${cod}` }
    console.log('cod ', msg);
    return await this.mailerService
      .sendMail({
        to: email,
        subject: `Код подтвеждения email: ${email}`,
        //
        //template: './test1',
        template: dirTemplates,
        context: msg,
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
        return false;
      });
  }
}
