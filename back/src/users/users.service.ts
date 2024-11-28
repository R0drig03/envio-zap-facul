import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity'; 
import { Repository } from 'typeorm'
import { UserInterface } from './interfaces/user.interface';
import { UpdateInterface } from './interfaces/update.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) //DECORADOR DO ATRIBUTO
    private readonly userRepository: Repository<UserEntity>, //CRIANDO UM ATRIBUTO PARA CLASSE E DECORANDO ELA COM O INJECTREPOSITORY (ISSO PARA PODER MANIPULAR UMA ENTIDADE NO NESTjs)
  ) {}

  async createUser(body: UserInterface): Promise<UserEntity> {
    const newuser = this.userRepository.create(body);
    return await this.userRepository.save(newuser); 
  }

  async findAll(param: boolean): Promise<UserEntity[]> { //TIPEI OBRIGANDO O RETORNO DO MÉTODO SER UM OBJETO DA ENTIDADE "UserEntity"

    if (param) {
      const allusers = await this.userRepository.createQueryBuilder()
        .withDeleted() // --> INCLUI OS REGISTROS COM SOFT DELETE
        .orderBy({id: 'ASC'})
        .getMany() 
         
      return allusers
    } 

    return await this.userRepository.find({ where: { deleted_at: null } });
  }

  async findOne(id: number): Promise<UserInterface> {

    const return_filter = await this.userRepository.createQueryBuilder('user')
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

    const user = await this.userRepository.preload({ id: Number(userId), ...userData });
    
    if (!user) {
      return null
    }

    const updatedUser = await this.userRepository.save(user); 
    
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
  