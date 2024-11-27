import { UserEntity } from "src/users/entities/user.entity";

export interface CreateContatosInterface {
    nome?: string;
    email?: string;
    ddd?: number;
    telefone?: number;
    fk_user?: UserEntity;
    deleted_at?: Date;
}