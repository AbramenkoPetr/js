import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Serializable } from 'child_process';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { Role } from '../auth/role/role.enum';
import { UserCreateDto } from './dto/user-create.dto';
import { EditUserDto } from './dto/edit-user-dto';
import { hash } from '../utils/crypto';
import { checkPermission, Modules } from '../auth/role/utils/check-permission';

export type User = any;

@Injectable()
export class UsersService {
constructor(
@InjectRepository(UsersEntity)
private usersRepository: Repository<UsersEntity>,
) {}
// Возвращаемое значение может быть Promise<UsersEntity|undefined>
// Озвучить устно, что необходимо отработать крайний случай на уровне выше, если запись не произошла
async create(user: UserCreateDto) {
    //console.log('UsersService user ', user);
const userEntity = new UsersEntity();
userEntity.firstName = user.firstName;
userEntity.lastName = user.lastName;
userEntity.email = user.email;
userEntity.roles = Role.User;
userEntity.avatar = user.avatar;
userEntity.password = await hash(user.password);
return await this.usersRepository.save(userEntity);
}

async usersAll()  {
  const users = await this.usersRepository.find();
  return users;
}

async getuser(id) {
    //const id = 1;
    
    const users = await this.usersRepository.find();
    const user = users.find(el => el.id == id);
    //console.log('user ', user);
    return user;
}

async findByEmail(email): Promise<UsersEntity> {
    const users = await this.usersRepository.find();
    const user = users.find(el => el.email == email);
    return user /*this.usersRepository.findOne({ email } )*/;
    }


    async edit(id: number, user: EditUserDto) {
        const _user = await this.getuser(id);
        if (!_user) {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: 'Неверный идентификатор пользователя',
            },
            HttpStatus.FORBIDDEN,
          );
        }
    
        _user.firstName = user.firstName || _user.firstName;
        _user.email = user.email || _user.email;
    
        if (checkPermission(Modules.changeRole, _user.roles)) {
          _user.roles = user.roles || _user.roles;
        }
        _user.password = (await hash(user.password)) || _user.password;
    
        return this.usersRepository.save(_user);
      }
    
      
// async setModerator(idUser): Promise<UsersEntity> {
//     const _user = await this.getuser(idUser);
//     if (!_user) {
//     throw new UnauthorizedException();
//     }
//     _user.roles = Role.Moderator;
//     return this.usersRepository.save(_user);
//     }



// async findById(id: number): Promise<UsersEntity> {
//     return this.usersRepository.findOne(id);
// }
// findOne(id: string): Promise<UsersEntity> {
//     return this.usersRepository.find().findById(id);
//   }
async remove(user)/*: Promise<UsersEntity>*/ {
  return await this.usersRepository.remove(user);
}
}
