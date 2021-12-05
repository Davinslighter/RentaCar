import {Entity, model, property} from '@loopback/repository';

@model()
export class Lugar extends Entity {
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
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  constructor(data?: Partial<Lugar>) {
    super(data);
  }
}

export interface LugarRelations {
  // describe navigational properties here
}

export type LugarWithRelations = Lugar & LugarRelations;
