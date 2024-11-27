import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';

export class UpdateUserDtoAux extends PartialType(CreateUserDto) {
    
    @ApiProperty()
    status_user: number;
} {}


export class UpdateUserDto extends PartialType(
    IntersectionType(
        CreateUserDto,
        UpdateUserDtoAux,
)) {}
