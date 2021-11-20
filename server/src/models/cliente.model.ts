import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Lugar} from './lugar.model';

@model()
export class Cliente extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    required: true,
  })
  cedula: number;

  @property({
    type: 'string',
    required: true,
  })
  id_lugar: string;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @hasOne(() => Lugar)
  lugar: Lugar;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
