import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContatosEntity } from './entities/contato.entity';
import { Repository } from 'typeorm'
//import { UserInterface } from './interfaces/user.interface';
//import { UpdateInterface } from './interfaces/update.interface';
import { CreateContatoDto } from './dto/create-contato.dto';
import { ContatosInterface } from './interfaces/create.interface';

@Injectable()
export class ContatosService {
  constructor(
    @InjectRepository(ContatosEntity) //DECORADOR DO ATRIBUTO
    private readonly contatosRepository: Repository<ContatosEntity>, //CRIANDO UM ATRIBUTO PARA CLASSE E DECORANDO ELA COM O INJECTREPOSITORY (ISSO PARA PODER MANIPULAR UMA ENTIDADE NO NESTjs)
  ) {}

  async create(body: CreateContatoDto): Promise<ContatosEntity> {
    const newcontato = this.contatosRepository.create(body);
    return await this.contatosRepository.save(newcontato); 
  }

  async findAll(param: boolean): Promise<ContatosEntity[]> { //TIPEI OBRIGANDO O RETORNO DO MÉTODO SER UM OBJETO DA ENTIDADE "ContatosEntity"

    if (param) {
      const allusers = await this.contatosRepository.createQueryBuilder()
        .withDeleted() // --> INCLUI OS REGISTROS COM SOFT DELETE
        .orderBy({id: 'ASC'})
        .getMany() 
         
      return allusers
    } 

    return await this.contatosRepository.find({ where: { deleted_at: null } });
  }

  async findOne(id: number): Promise<UserInterface> {

    const return_filter = await this.contatosRepository.createQueryBuilder('user')
      .withDeleted() 
      .where({ id: +id })
      .getOne();
    
    const return_interface = {
      id: return_filter.id,
      nome: return_filter.nome,
      email:  return_filter.email,
      username: return_filter.username,
      password: return_filter.password,
      type_user: return_filter.type_user,
      created_at: return_filter.created_at,
      deleted_at: return_filter.deleted_at
    };

    return return_interface
  }

  
  async update(userId: number, userData: UserInterface): Promise<UpdateInterface | null> {

    const user = await this.contatosRepository.preload({ id: Number(userId), ...userData });
    
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

  
  async delete( userId: Number): Promise<UserInterface | null> {

    //PRIMEIRO PRECISO BUSCAR OS DADOS DAQUELE ID PARA REALIZAR O RETURN DA FUNÇÃO
    const dados_id = await this.findOne(Number(userId))

    //PREPARANDO ATUALIZAÇÃO
    const date_del = new Date()
    const payload = {
      deleted_at: date_del
    }

    try {
      await this.update(Number(userId), payload); //--> ATUALIZANDO
    
      const data_return: UserInterface = {
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
  