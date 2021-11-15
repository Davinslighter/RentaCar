import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Cliente} from './cliente.model';

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
    type: 'string',
    required: true,
    default: 'procesando',
    enum: ["enviado", "en estudio", "aceptado", "rechazado", "procesando"]
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  id_cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  id_vehiculo: string;

  @hasOne(() => Vehiculo)
  vehiculo: Vehiculo;

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
