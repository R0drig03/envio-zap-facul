import { UserEntity } from "src/users/entities/user.entity";

export interface CreateContatosInterface {
    nome?: string;
    email?: string;
    ddd?: number;
    telefone?: string;
    fk_user?: UserEntity;
    deleted_at?: Date;
}