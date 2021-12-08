import {model, property} from '@loopback/repository';
import {Usuario} from '.';

@model()
export class UsuarioConClave extends Usuario {
  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<UsuarioConClave>) {
    super(data);
  }
}

export interface UsuarioConClaveRelations {
  // describe navigational properties here
}

export type UsuarioConClaveWithRelations = UsuarioConClave & UsuarioConClaveRelations;
