import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
import { HttpErrors } from '@loopback/rest';

const generador = require('password-generator');
const cryptoJS = require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class UserManagementService {
  constructor(

    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository
  ) {}

  /*
   * Add service methods here
   */

  generarClave() {
    let password = generador(8, false);
    return password;
  }

  cifrarClave(password: string) {
    let claveCifrada = cryptoJS.MD5(password).toString();
    return claveCifrada;
  }

  descifrarClave(password: string) {
    let claveDescifrada = cryptoJS.AES.decrypt(password).toString();
    return claveDescifrada;
  }

  async verificarUsuario(email:string, password:string) {
    try {
      let u = this.usuarioRepository.findOne({where: {email: email, password: password}});
      if (u) {
        return u;
      }
      return false;
    } catch {
      return false;
      }
  }

  async passwordReset(email:string) {
    const cuentaNoEncontrada = "Cuenta no encontrada!";
    const usuarioEncontrado = await this.usuarioRepository.findOne({where: {email},});

    if (!usuarioEncontrado) {
      throw new HttpErrors.NotFound(cuentaNoEncontrada);
    }
    else {
      return usuarioEncontrado;
    }
  }

}
