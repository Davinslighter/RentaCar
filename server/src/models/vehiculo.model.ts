import {Entity, model, property} from '@loopback/repository';

@model()
export class Vehiculo extends Entity {
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
  estado: number;

  @property({
    type: 'string',
    required: true,
    default: 'automóvil',
    enum: ["bicicleta", "motocicleta", "automóvil", "autobús"]
  })
  tipo: string;

  @property({
    type: 'string',
  })
  marca?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  modelo?: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'number',
    required: true,
  })
  extras: number;

  @property({
    type: 'number',
    required: true,
  })
  accesorios: number;

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


  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
