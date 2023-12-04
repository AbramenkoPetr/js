import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  // @IsNotEmpty()
  // @IsObject()
  // user: object;

  // @IsNotEmpty()
  // @IsString()
  // author: string;

  // @IsNotEmpty()
  // @IsNumber()
  // authorId: number;

  // @IsNotEmpty()
  // @IsNumber()
  // categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  

  cover: string;
}
