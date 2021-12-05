import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { Llaves } from '../config/llaves';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { Usuario } from '../models';
import { UsuarioRepository } from '../repositories';

const jwt = require('jsonwebtoken');


@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(
    @repository (UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) {}

  async verificarToken(token: string) {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verificando token : 'token' es nulo`,
      );
    }

    try {

      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;

    } catch (error) {
      throw new HttpErrors.Unauthorized(
         `Error verifying token : ${error.message}`,
      );
    }
  }
  
  async generarToken(usuario: Usuario) {
    let token = jwt.sign({
      data: {
        id: usuario.id,
        correo: usuario.email,
        nombre: usuario.nombre + "" + usuario.apellido,
      }
    },
      Llaves.claveJWT);
      return token;
  }
  
}
