import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Departamento} from './departamento.model';

@model()
export class Ciudad extends Entity {
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
  id_departamento: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  @property({
    type: 'string',
  })
  lugarId?: string;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
