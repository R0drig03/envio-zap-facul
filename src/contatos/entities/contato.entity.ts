import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "src/users/entities/user.entity";

@Entity({name:'contatos'})
export class ContatosEntity {
    
    @PrimaryGeneratedColumn({type: 'int', unsigned: true})
    id: number

    @Column({type: 'varchar', length: 255, name: 'nome', nullable: false})
    nome: string

    @Column({type:'varchar', length:255, name: 'email'})
    email: string

    @Column({type: 'int', length: 64, name: 'telefone', nullable: false})
    telefone: number

    @ManyToOne(() => UserEntity, (users) => users.fk_contatos)
    @JoinColumn({ name: 'fk_user' })
    fk_user: UserEntity

    @UpdateDateColumn({ name: 'update_at' })
    updated_at: Date;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @DeleteDateColumn({ name: 'deleted_at'})
    deleted_at: Date
}