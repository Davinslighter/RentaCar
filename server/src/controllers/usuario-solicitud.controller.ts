import { authorize } from '@loopback/authorization';
import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Solicitud,
} from '../models';
import {UsuarioRepository} from '../repositories';
import { basicAuthorization } from '../services';

export class UsuarioSolicitudController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({allowedRoles: ['cliente', 'asesor'], voters: [basicAuthorization]})
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.usuarioRepository.solicitudes(id).find(filter);
  }

  @post('/usuarios/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({allowedRoles: ['cliente'], voters: [basicAuthorization]})
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.usuarioRepository.solicitudes(id).create(solicitud);
  }

  @patch('/usuarios/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Usuario.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({allowedRoles: ['cliente'], voters: [basicAuthorization]})
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.usuarioRepository.solicitudes(id).patch(solicitud, where);
  }

  @del('/usuarios/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Usuario.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({allowedRoles: ['cliente'], voters: [basicAuthorization]})
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.usuarioRepository.solicitudes(id).delete(where);
  }
}
