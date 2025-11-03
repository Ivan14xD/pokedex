import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ImportarPokemonesModule } from './importar-pokemones/importar-pokemones.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsuariosService } from './usuarios/usuarios.service';
import { FavoritosService } from './favoritos/favoritos.service';
import { UsuarioModule } from './usuarios/usuarios.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  PokemonModule, 
  ImportarPokemonesModule, UsuarioModule],
  controllers: [],
  providers: [PrismaService, UsuariosService, FavoritosService],
})
export class AppModule {}
