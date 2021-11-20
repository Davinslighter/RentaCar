import {Entity, model, property, hasOne} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Ciudad} from './ciudad.model';

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

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  @hasOne(() => Departamento)
  departamento: Departamento;

  @hasOne(() => Ciudad)
  ciudad: Ciudad;

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
