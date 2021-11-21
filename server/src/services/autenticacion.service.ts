import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
import { Llaves } from '../config/llaves';

const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */
    @repository (UsuarioRepository)
    public usuarioRepository: UsuarioRepository
             ) {}

  /*
   * Add service methods here
   */

  // generar clave
  GenerarClave() {
    let clave = generador(8, false);
    return clave;
    }

  // cifrar clave
    CifrarClave(clave: string) {
      let claveCifrada = cryptoJS.MD5(clave).toString();
      return claveCifrada;
    }

  // descifrar clave
    DescifrarClave(clave: string) {
      let claveDescifrada = cryptoJS.AES.descrypt(clave).toString();
      return claveDescifrada;
    }

  // identificar usuario
    IdentificarUsuario(usuario: string, clave: string) {
      try {
        let u = this.usuarioRepository.findOne({where: {email: usuario, password: clave}});
        if(u) {
          return u;
        }
        return false;
      } catch {
        return false;
      }
    }

  // contraseñas
    RecuperarClave(correo: string) {
      try {
        let c = this.usuarioRepository.findOne({where: {email: correo}});
        if (c) {
          return c;
        }
        return false;
      } catch {
        return false;
      }
    }

  // Json Web Token
    GenerarTokenJWT(usuario: Usuario) {
      let token: jwt.sign({
        data: {
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.email,
          rol: usuario.rol
        }
      },
        Llaves.claveJWT);
        return token;
    }

    // Validar Token
    ValidarTokenJWT(token: string) {
      try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
      } catch {
        return false;
      }
    }


}
