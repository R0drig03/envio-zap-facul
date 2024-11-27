import { Module } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { ContatosController } from './contatos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContatosEntity } from './entities/contato.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([ContatosEntity])],
  controllers: [ContatosController],
  providers: [ContatosService],
})
export class ContatosModule {}
