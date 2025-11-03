import { NotFoundException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

// Importa el tipo User generado por Prisma
import type { usuario as Usuario } from 'generated/prisma/client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {

  private config: argon2.Options

  constructor(private readonly prisma: PrismaService) { 
    this.config = {
      type: argon2.argon2id,
      memoryCost:2 ** 16,
      hashLength: 50,
      parallelism: 2,


    };
  }
  
  async create(data: CreateUsuarioDto): Promise<Usuario> {
    try {
      
      if (data.contrasena) {
        const hash = await argon2.hash(data.contrasena, this.config);
        data.contrasena = hash;
      }


      return await this.prisma.usuario.create({
        data,
      });
    } catch (error) {
      // Código P2002: Violación de restricción única (ej: username ya existe)
      if (error.code === 'P2002') { 
        throw new Error('El nombre de usuario ya existe. Por favor, elige otro.'); 
      }
      throw error;
    }
  }


  async findAll(): Promise<Usuario[]> {
     
    
    return this.prisma.usuario.findMany();
  }


  async findOne(id: number): Promise<Usuario | null> {
    try {
      return await this.prisma.usuario.findUnique({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }


  async update(id: number, data: UpdateUsuarioDto): Promise<Usuario> {
    try {
      return await this.prisma.usuario.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`El Usuario con ID #${id} no fue encontrado para actualizar.`);
      }
      // Manejar P2002 si el usuario intenta actualizar a un username existente
      if (error.code === 'P2002') { 
        throw new Error('El nombre de usuario que intentas usar ya está ocupado.'); 
      }
      throw error;
    }
  }


  async remove(id: number): Promise<Usuario> {
    try {
      return await this.prisma.usuario.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`El Usuario con ID #${id} no fue encontrado para eliminar.`);
      }
      throw error;
    }
  }
}