import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    } from 'typeorm';
import { UsersEntity } from '../../users/users.entity';
import { NewsEntity } from '../news.entity';
@Entity('comments')
export class CommentsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    message: string;

    @Column('text', { nullable: true })
    avatar: string;

    @Column('text', { nullable: true })
    author: string;

    @ManyToOne(() => UsersEntity, (user) => user.comments)
    user: UsersEntity;

    @ManyToOne(() => NewsEntity, (news) => news.comments)
    news: NewsEntity;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column('text', { nullable: true })
    userId: number;

    @Column('text', { nullable: true })
    newsId: number;
}
