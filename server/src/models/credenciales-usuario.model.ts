import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialesUsuario extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<CredencialesUsuario>) {
    super(data);
  }
}

export interface CredencialesUsuarioRelations {
  // describe navigational properties here
}

export type CredencialesUsuarioWithRelations = CredencialesUsuario & CredencialesUsuarioRelations;
