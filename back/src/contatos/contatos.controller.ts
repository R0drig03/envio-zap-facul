import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('contatos')
export class ContatosController {
  constructor(private readonly contatosService: ContatosService) {}

  @Post()
  create(@Body() createContatoDto: CreateContatoDto) {
    return this.contatosService.create(createContatoDto);
  }

  @Get('all')
  @ApiQuery(
    {
        name: 'inativos',
        required: false, // --> FICA DEFINIDO COMO NÃO OBRIGATÓRIO O PREENCHIMENTO DOS PARÃMETROS
        type: Boolean,
        description: 'Contatos Inativos',
    }
  )
  @ApiQuery(
    {
        name: 'telefone',
        required: false, // --> FICA DEFINIDO COMO NÃO OBRIGATÓRIO O PREENCHIMENTO DOS PARÃMETROS
        type: Number,
        description: 'Numero Telefone',
    }
)
  findAll(@Query('inativos') param_inativ?: boolean, @Query('telefone') param_telefone?: number) {

    return this.contatosService.findAll(param_inativ, param_telefone);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contatosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContatoDto: UpdateContatoDto) {
    return this.contatosService.update(+id, updateContatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contatosService.delete(+id);
  }
}
