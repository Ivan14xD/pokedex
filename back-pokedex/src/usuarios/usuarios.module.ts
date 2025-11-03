 import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuariosService, PrismaService],
})
export class UsuarioModule {}