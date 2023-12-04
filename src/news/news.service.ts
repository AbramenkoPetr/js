import { Injectable } from '@nestjs/common';
import { Comment } from './comments/comments.service';
import { CommentsService } from './comments/comments.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
import { CreateNewsDto } from './dtos/create-news-dto';
import { UsersEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';


export interface News {
  id?: number;
  title: string;
  description: string;
  //author: string;
  countView?: number;
  createdAt?: Date;
  cover?: string;
  comments?: Comment[];
  
}

export interface NewsEdit {
  title?: string;
  description?: string;
  author?: string;
  countView?: number;
  cover?: string;
}

export function getRandomInt(min = 1, max = 9999): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

// class newsRepository{//*/
// constructor(
//   @InjectRepository(NewsEntity)
//   private readonly newsRepository: Repository<NewsEntity>,
//   ) {}
// }//*/


@Injectable()


export class NewsService {

  constructor(
    @InjectRepository(NewsEntity)
    private  newsRepository: Repository<NewsEntity>,
    //@InjectRepository(UsersEntity)
    private usersService: UsersService,
    private commentsService: CommentsService,
    ) {}

    private readonly news: News[] = [
    //{id: 1...},
    ];

  //   news: News[] = [
  //   {
  //     id: 1,
  //     title: 'Наша первая новость',
  //     description: 'Содержание новости',
  //     author: 'Петр',
  //     createdAt: '2023-02-16',
  //     countView: 12,
  //     cover: '/news-static/cat1.gif',
  //      comments: [
  //     //   {message: 'Отличная новость',
  //     //   author: 'Аноним'},
  //      ],
     
  //   },
  // ];
    
  // create(news: News): News {
  //   const id = getRandomInt(0, 99999);
  //   const finalNews = {
  //     ...news,
  //     id: id,
  //   };

  //   this.news.push(finalNews);
  //   return finalNews;
  // }

  // async create(news: NewsEntity) {
  //   //console.log('news ',news);
  //   return await this.newsRepository.save(news);
  // }

  async create(news/*: CreateNewsDto*/): Promise<NewsEntity>  {
    const newsEntity = new NewsEntity();
    //console.log('NewsService create news ', news);
    newsEntity.title = news.title;
    newsEntity.description =news.description;
    newsEntity.cover =news.cover;
    //const _user = await this.usersService.getuser(news.userId)
    //newsEntity.user = _user;
    newsEntity.userId = news.userId;
    newsEntity.categoryId =Number(1);
    //newsEntity.user = await this.usersService.getuser(Number(newsEntity.userId));
    newsEntity.user = news.user
    // console.log('news ', news);
     //console.log('NewsService create newsEntity ', newsEntity);
     //return;
    return await this.newsRepository.save(newsEntity);
  }

  find(id: News['id']): News | undefined {
    return this.news.find((news) => news.id === id);
  }

  async findById(id): Promise<NewsEntity> {
    const news1s = await this.newsRepository.find({});
    const news1 = news1s.find(el => el.id == id);
    //console.log('news1 ', news1);
    return news1;
    }

    async findByUser(id)/*: Promise<NewsEntity>*/ {
      const news1s = await this.newsRepository.find({});
      const news1 = []/*news1s.find(el => el.userId == id);*/
      news1s.forEach(el => { if(el.userId == id) news1.push(el)});
      //console.log('news1 ', news1);
      return news1;
      }

  getAll(): News[] {
    return this.news;
  }

  async findAll(): Promise<NewsEntity[]> {
    const news1 = await this.newsRepository.find({});
    //console.log('news1 ', news1);
    return news1;
    }

    async edit(/*id: number*/_news) {
      const id = _news.id;
      //const _whs = await this.findById(id);
      //console.log('whsservice edit _whs ', _news);
      return await this.newsRepository.update(id, _news);
    }
      
  // edit1(id: number, news: NewsEdit): News | undefined {
  //   const indexEditableNews = this.news.findIndex((news) => news.id === id);
  //   if (indexEditableNews !== -1) {
  //     this.news[indexEditableNews] = {
  //       ...this.news[indexEditableNews],
  //       ...news,
  //     };

  //     return this.news[indexEditableNews];
  //   }
  //   return undefined;
  // }

  // remove(id: News['id']): boolean {
  //   const indexRemoveNews = this.news.findIndex((news) => news.id === id);
  //   if (indexRemoveNews !== -1) {
  //     this.news.splice(indexRemoveNews, 1);
  //     return true;
  //   }
  //   return false;
  // }

  async remove(id: number) {
    const _news = await this.findById(id);
    const comments = await this.commentsService.find(id);
    comments.forEach(e => this.commentsService.remove(e.id));
    return await this.newsRepository.remove(_news);
    }

}

