import {Model, model, property} from '@loopback/repository';

@model()
export class ClaveOlvidada extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;


  constructor(data?: Partial<ClaveOlvidada>) {
    super(data);
  }
}

export interface ClaveOlvidadaRelations {
  // describe navigational properties here
}

export type ClaveOlvidadaWithRelations = ClaveOlvidada & ClaveOlvidadaRelations;
