import { Credenciales  } from '../repositories';
import isemail from 'isemail';
import { HttpErrors } from '@loopback/rest';
import { LlaveClave } from "../models";

export function validarCredenciales(credenciales: Credenciales) {
  // Validar email
  if (!isemail.validate(credenciales.email)) {
    throw new HttpErrors.UnprocessableEntity('email invalido');
  }
  
  // Validar longitud de la clave
  if (!credenciales.password || credenciales.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'la clave debe tener al menos 8 carácteres',
    );
  }
}

export function validarLlaveClave(llaveClave: LlaveClave) {
  if (!llaveClave.password || llaveClave.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'la clave debe tener al menos 8 carácteres'
    );
  }

  if (llaveClave.password != llaveClave.confirmPassword) {
    throw new HttpErrors.UnprocessableEntity(
      'las claves no coinciden',
    );
  }
  if (
    llaveClave.resetKey.length === 0 ||
    llaveClave.resetKey.trim() === ''
  ) {
    throw new HttpErrors.UnprocessableEntity('reset key es obligatoria');
  }
}
