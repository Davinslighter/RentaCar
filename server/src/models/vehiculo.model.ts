import {Entity, model, property, hasOne} from '@loopback/repository';
import {Lugar} from './lugar.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  disponibilidad: boolean;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  tipo: string[];

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
  })
  modelo?: number;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
  })
  color?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  extras?: string[];

  @property({
    type: 'boolean',
    default: false,
  })
  accesorios?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
  })
  videoURL?: string;

  @property({
    type: 'string',
    required: true,
  })
  lugarId: string;

  @hasOne(() => Lugar)
  lugar: Lugar;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
