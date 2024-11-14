import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class UserEntity {
    
    @PrimaryGeneratedColumn({type: 'int', unsigned: true})
    id: number

    @Column({type: 'varchar', length: 255, name: 'nome', nullable: false})
    nome: string

    @Column({type:'varchar', length:255, name: 'email'})
    email: string

    @Column({type: 'varchar', length: 64, name: 'username', nullable: false})
    username: string

    @Column({type: 'varchar', length: 64, name: 'password', nullable: false})
    password: string

    @Column({type: "tinyint", name: 'type_user', comment: '0: PADRÃO 1: ADMIN'})
    type_user: number

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @Column({type: "tinyint", name: 'status_user', default: 1, comment: '0: INATIVO 1: ATIVO'})
    status_user: number
}