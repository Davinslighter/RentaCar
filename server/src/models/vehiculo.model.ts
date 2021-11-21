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
    type: 'string',
    required: true,
  })
  tipo: string;

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
    type: 'string',
    required: true,
  })
  modelo: string;

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
    type: 'boolean',
    required: true,
  })
  extras: boolean;

  @property({
    type: 'array',
    itemType: 'string',
  })
  accesorios?: string[];

  @property({
    type: 'string',
    required: true,
  })
  id_lugar: string;

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
  id_asesor: string;

  @property({
    type: 'string',
  })
  solicitudId?: string;

  @property({
    type: 'string',
  })
  asesorId?: string;

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
