import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesEntity } from './categories.entity';
import { Roles } from '../auth/role/roles.decorator';
import { Role } from '../auth/role/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
constructor(private readonly categoriesService: CategoriesService) {}
@Post()
@UseGuards(JwtAuthGuard)
@Roles(Role.Admin)
async create(@Body('name') name): Promise<CategoriesEntity> {
return this.categoriesService.create(name);
}
@Get()
//const id = 1;
// async findById(): Promise<CategoriesEntity> {
//     return this.categoriesService.findById();
// }
async findbyid() {
    const id = 1;
    const cat = await this.categoriesService.findById(id);
    //console.log('cat ', cat);  
}
}
