import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Llaves } from '../keys';
import { HttpErrors } from '@loopback/rest';
import { CredencialesUsuario, Usuario, UsuarioConClave } from '../models';
import {Credenciales, UsuarioRepository} from '../repositories';
import { securityId, UserProfile } from '@loopback/security';
 
const generador = require('password-generator');
const cryptoJS = require('crypto-js');


@injectable({scope: BindingScope.TRANSIENT})
export class UserManagementService {
  constructor( 
    @repository (UsuarioRepository)
    public usuarioRepository: UsuarioRepository
    ) {}

  /*
   * Add service methods here
   */

    generarClave() {
      let clave = generador(8, false);
      return clave;
    }

    cifrarClave(clave: string) {
      let claveCifrada = cryptoJS.MD5(clave).toString();
      return claveCifrada;
    }

    descrifrarClave(clave: string) {
      let claveDescifrada = cryptoJS.AES.descrypt(clave).toString();
      return claveDescifrada;
    }

  async verificarCredenciales(credenciales: Credenciales): Promise<Usuario> {
      const {email, password} = credenciales;
      const errorCredencialesInvalidas = "Correo o clave inválida";

      if(!email) {
        throw new HttpErrors.Unauthorized(errorCredencialesInvalidas);
      }
      const usuarioEncontrado = await this.usuarioRepository.findOne({where: {email},});

      if(!usuarioEncontrado) {
        throw new HttpErrors.Unauthorized(errorCredencialesInvalidas);
      }

      const credencialesEncontradas = await this.usuarioRepository.findCredenciales(usuarioEncontrado.id,);

      if (!credencialesEncontradas) {
        throw new HttpErrors.Unauthorized(errorCredencialesInvalidas);
      }

    return usuarioEncontrado;
    }

    convertirPerfilUsuario(usuario: Usuario): UserProfile {
      let username = "";
      if (usuario.nombre) username = `${usuario.nombre}`;
      if (usuario.apellido)
        username = usuario.nombre
          ? `${username} ${usuario.apellido}`
        : `${usuario.apellido}`;
        return {
          [securityId]: usuario.id,
          nombreCompleto: username,
          id: usuario.id,
          roles: usuario.roles,
        };
    }

    async crearUsuario(usuarioConClave: UsuarioConClave): Promise<Usuario> {
      const password = await this.cifrarClave(usuarioConClave.password);
      usuarioConClave.password = password;
      const usuario = await this.usuarioRepository.create(_.omit(usuarioConClave, 'password'));
      usuario.id = usuario.id;
      await this.usuarioRepository.credencialesUsuario(usuario.id).create({password});
      return usuario;
    }

    async solicitarClave(email: string) {
      const noAccountFoundError = "La cuenta no está registrada!";
      const usuarioEncontrado = await this.usuarioRepository.findOne({where: {email}});

      if (!usuarioEncontrado) {
        throw new HttpErrors.NotFound(noAccountFoundError);
      }
      else {
        return usuarioEncontrado;
      }
    }

}
