import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, isURL } from "class-validator";
import { pokemon, tipo_pokemon } from "generated/prisma/client";

export class TipoPokemon implements tipo_pokemon {
    
     @ApiProperty()
     @IsNumber()
     id: number;
    
     @ApiProperty()
     @IsString()
     @IsNotEmpty()
     nombre: string;

}
