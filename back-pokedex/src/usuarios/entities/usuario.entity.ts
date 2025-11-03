import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";

export class Usuario {

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    contrasena: string;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    createAt: Date;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    updateAt: Date;

}