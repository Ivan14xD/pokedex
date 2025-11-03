import { OmitType } from '@nestjs/swagger';
import { Usuario } from '../entities/usuario.entity';

// OmitType crea una nueva clase 
export class CreateUsuarioDto extends OmitType(Usuario, ['id' as const]) {
   
}
