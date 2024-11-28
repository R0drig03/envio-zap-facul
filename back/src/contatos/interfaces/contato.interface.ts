import { UserEntity } from "src/users/entities/user.entity"

export interface ContatosInterface {
    id?: number
    nome?: string
    email?: string
    telefone?: string
    fk_user?: {id: number, username: string, nome: string, email: string, type_user: number} | number
    updated_at?: Date;
    created_at?: Date
    deleted_at?: Date
}