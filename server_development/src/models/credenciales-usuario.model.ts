import {Entity, model, property} from '@loopback/repository';

@model()
export class CredencialesUsuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    mongodb: {dataType: 'ObjectID'},
  })
  usuarioId: string;


  constructor(data?: Partial<CredencialesUsuario>) {
    super(data);
  }
}

export interface CredencialesUsuarioRelations {
  // describe navigational properties here
}

export type CredencialesUsuarioWithRelations = CredencialesUsuario & CredencialesUsuarioRelations;
