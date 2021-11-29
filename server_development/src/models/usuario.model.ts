import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {CredencialesUsuario} from './credenciales-usuario.model';

@model()
export class Usuario extends Entity {
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
  email: string;

  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'string',
  })
  apellido?: string;

  @property({
    type: 'string',
  })
  nombreCompleto?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  roles?: string[];

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @hasOne(() => CredencialesUsuario)
  credencialesUsuario: CredencialesUsuario;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
