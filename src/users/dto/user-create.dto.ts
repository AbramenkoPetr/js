import { IsNotEmpty, IsString, IsEmail, IsEnum,} from 'class-validator';
import { Column }   from 'typeorm';
import { Role } from '../../auth/role/role.enum';
export class UserCreateDto {
@IsNotEmpty()
@IsString()
firstName: string;

@IsNotEmpty()
@IsString()
lastName: string;

@IsNotEmpty()
@IsEmail()
email: string;

@IsNotEmpty()
// @IsString()
// roles: string;
@IsEnum(Role)
roles: Role;

@Column('text')
password: string;

@IsNotEmpty()
@IsString()
avatar: string;

}


