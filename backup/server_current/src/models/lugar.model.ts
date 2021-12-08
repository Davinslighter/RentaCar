import {Entity, model, property, hasOne} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Departamento} from './departamento.model';

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
  id_departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  id_ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @hasOne(() => Ciudad)
  ciudad: Ciudad;

  @hasOne(() => Departamento)
  departamento: Departamento;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  constructor(data?: Partial<Lugar>) {
    super(data);
  }
}

export interface LugarRelations {
  // describe navigational properties here
}

export type LugarWithRelations = Lugar & LugarRelations;
