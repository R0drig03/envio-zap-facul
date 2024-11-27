import { ContatosEntity } from "src/contatos/entities/contato.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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

    @UpdateDateColumn({ name: 'update_at' })
    updated_at: Date;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @OneToMany(() => ContatosEntity, (contatos) => contatos.fk_user)
    fk_contatos: ContatosEntity[];
}