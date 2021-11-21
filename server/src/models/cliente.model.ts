import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Usuario} from './usuario.model';
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
    type: 'number',
    required: true,
  })
  telefono: number;

  @property({
    type: 'number',
  })
  edad?: number;

  @property({
    type: 'string',
    required: true,
  })
  id_lugar: string;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @belongsTo(() => Usuario)
  usuarioId: string;

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
