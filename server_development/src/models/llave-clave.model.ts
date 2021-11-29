import {Model, model, property} from '@loopback/repository';

@model()
export class LlaveClave extends Model {
  @property({
    type: 'string',
  })
  resetKey?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
  })
  confirmPassword?: string;


  constructor(data?: Partial<LlaveClave>) {
    super(data);
  }
}

export interface LlaveClaveRelations {
  // describe navigational properties here
}

export type LlaveClaveWithRelations = LlaveClave & LlaveClaveRelations;
