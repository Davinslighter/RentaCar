import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
  })
  total: number;

  @property({
    type: 'string',
  })
  nombreCompleto?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  estado: string[];

  @property({
    type: 'string',
    required: true,
  })
  vehiculoId: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
