import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('Users')
export class UserController{
    constructor(private readonly userService: UserService) {}

    @ApiBody({ type: CreateUserDto })
    @Post('')
    async createConvenio(@Body() body_create: CreateUserDto ): Promise<CreateUserDto>{
      return await this.userService.createUser(body_create)
    }
    
    @Get('all')
    @ApiQuery({
      name: 'inativos',
      required: false, // --> FICA DEFINIDO COMO NÃO OBRIGATÓRIO O PREENCHIMENTO DOS PARÃMETROS
      type: Boolean,
      description: 'Convenios Inativos',
    })
    async findAll(@Query('inativos') param_input: string): Promise<UserEntity[]> {
      const param = param_input === 'true'
      return await this.userService.findAll(param);
    }

    @Get(':id')
    async findOne(@Param('id') id_input: number) {
      return await this.userService.findOne(+id_input);
    }

    @Patch(':id')
    @ApiBody({ type: UpdateUserDto })
    async upConvenio(@Param('id') id: number, @Body() Body: UpdateUserDto) {
      return await this.userService.update(+id, Body);
    }

    @Delete(':id')
    async deleteCity(@Param('id') id: number) {
      return await this.userService.delete(id);
    }
    
}