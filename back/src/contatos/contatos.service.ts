import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContatosEntity } from './entities/contato.entity';
import { Repository } from 'typeorm'
//import { ContatosInterface } from './interfaces/user.interface';
import { UpdateInterface } from './interfaces/update.interface';
import { CreateContatoDto } from './dto/create-contato.dto';
import { CreateContatosInterface } from './interfaces/create.interface';
import { ContatosInterface } from './interfaces/contato.interface';

@Injectable()
export class ContatosService {
  constructor(
    @InjectRepository(ContatosEntity) //DECORADOR DO ATRIBUTO
    private readonly contatosRepository: Repository<ContatosEntity>, //CRIANDO UM ATRIBUTO PARA CLASSE E DECORANDO ELA COM O INJECTREPOSITORY (ISSO PARA PODER MANIPULAR UMA ENTIDADE NO NESTjs)
  ) {}

  async create(body: CreateContatoDto): Promise<ContatosEntity> {
    console.log('BATI NO ENDPOINT DE CRIAR CONTATO')
    const newcontato = this.contatosRepository.create(body);
    return await this.contatosRepository.save(newcontato); 
  }

  async findAll(param_inativ?: boolean, param_telefon?: number): Promise<ContatosInterface[]> { //TIPEI OBRIGANDO O RETORNO DO MÉTODO SER UM OBJETO DA ENTIDADE "ContatosEntity"

    console.log('BATI NO ENDPOINT PARA PUXAR TUDO')
    const queryBuilder = this.contatosRepository.createQueryBuilder('contatos').leftJoinAndSelect('contatos.fk_user', 'fk_user');

    if (param_inativ) {
      queryBuilder.withDeleted(); // --> INCLUI OS REGISTROS COM SOFT DELETE
    }

    if (param_telefon) {
      queryBuilder.andWhere("telefone LIKE :telefone", { telefone: `%${param_telefon}%` }); 
    }

    const return_consulta = await queryBuilder.orderBy({ 'contatos.id': 'ASC' }).getMany(); // EXECUTANDO A CONSULTA

    const consult_interface = return_consulta.map(element_obj => {
      return {
        id: element_obj.id,
        nome: element_obj.nome,
        telefone: element_obj.telefone,
        fk_user: {
            id: element_obj.fk_user.id, 
            username: element_obj.fk_user.username, 
            nome: element_obj.nome, 
            email: element_obj.fk_user.email, 
            type_user: element_obj.fk_user.type_user
          },
        updated_at: element_obj.updated_at,
        created_at: element_obj.created_at,
        deleted_at: element_obj.deleted_at
      }
    });

    return consult_interface
  }

  async findOne(id: number): Promise<ContatosInterface> {

    console.log('BATI NO ENDPOINT DE PEGAR UM')
    const return_filter = await this.contatosRepository.createQueryBuilder('contatos')
      .leftJoinAndSelect('contatos.fk_user', 'fk_user')
      .withDeleted() // --> INCLUI OS REGISTROS COM SOFT DELETE
      .where({ id: +id })
      .getOne();
    
    const return_interface = {
      id: return_filter.id,
      nome: return_filter.nome,
      telefone: return_filter.telefone,
      fk_user: {
          id: return_filter.fk_user.id, 
          username: return_filter.fk_user.username, 
          nome: return_filter.nome, 
          email: return_filter.fk_user.email, 
          type_user: return_filter.fk_user.type_user
        },
      updated_at: return_filter.updated_at,
      created_at: return_filter.created_at,
      deleted_at: return_filter.deleted_at
    }

    return return_interface
  }

  
  async update(userId: number, userData: CreateContatosInterface): Promise<UpdateInterface | null> {

    console.log('BATI NO ENDPOINT DE ATUALIZAR')
    const user = await this.contatosRepository.preload({ id: +userId, ...userData });
    
    if (!user) {
      return null
    }

    const updatedUser = await this.contatosRepository.save(user); 
    
    const return_up = {
      id: userId,
      columns_up: Object.keys(userData),
      at_update: updatedUser.updated_at,
      table_name: 'user',
    }
    
    return return_up; 
  }

  
  async delete( userId: Number): Promise<ContatosInterface | null> {

    console.log('BATI NO ENDPOINT DE DELETAR')
    //PRIMEIRO PRECISO BUSCAR OS DADOS DAQUELE ID PARA REALIZAR O RETURN DA FUNÇÃO
    const dados_id = await this.findOne(Number(userId))

    //PREPARANDO ATUALIZAÇÃO
    const date_del = new Date()
    const payload = {
      deleted_at: date_del
    }

    try {
      await this.update(Number(userId), payload); //--> ATUALIZANDO
    
      const data_return: ContatosInterface = {
        id: dados_id.id,
        nome: dados_id.nome,
        created_at: dados_id.created_at,
        updated_at: dados_id.updated_at,
        deleted_at: date_del,
      }

      return  data_return;
    } catch (error){
      return null;
    } 
  }
}
  