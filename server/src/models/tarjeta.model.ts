import {Entity, model, property} from '@loopback/repository';

@model()
export class Tarjeta extends Entity {
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
  numero: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  codigo: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  foto?: string;


  constructor(data?: Partial<Tarjeta>) {
    super(data);
  }
}

export interface TarjetaRelations {
  // describe navigational properties here
}

export type TarjetaWithRelations = Tarjeta & TarjetaRelations;
