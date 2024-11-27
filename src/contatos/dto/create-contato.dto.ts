import { ApiProperty } from "@nestjs/swagger"
import { UserEntity } from "src/users/entities/user.entity"

export class CreateContatoDto {
    @ApiProperty()
    nome: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    telefone: string;

    @ApiProperty()
    fk_user: UserEntity;
}
