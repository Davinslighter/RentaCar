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
  CredencialesUsuario,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioCredencialesUsuarioController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/credenciales-usuario', {
    responses: {
      '200': {
        description: 'Usuario has one CredencialesUsuario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CredencialesUsuario),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CredencialesUsuario>,
  ): Promise<CredencialesUsuario> {
    return this.usuarioRepository.credencialesUsuario(id).get(filter);
  }

  @post('/usuarios/{id}/credenciales-usuario', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(CredencialesUsuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CredencialesUsuario, {
            title: 'NewCredencialesUsuarioInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) credencialesUsuario: Omit<CredencialesUsuario, 'id'>,
  ): Promise<CredencialesUsuario> {
    return this.usuarioRepository.credencialesUsuario(id).create(credencialesUsuario);
  }

  @patch('/usuarios/{id}/credenciales-usuario', {
    responses: {
      '200': {
        description: 'Usuario.CredencialesUsuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CredencialesUsuario, {partial: true}),
        },
      },
    })
    credencialesUsuario: Partial<CredencialesUsuario>,
    @param.query.object('where', getWhereSchemaFor(CredencialesUsuario)) where?: Where<CredencialesUsuario>,
  ): Promise<Count> {
    return this.usuarioRepository.credencialesUsuario(id).patch(credencialesUsuario, where);
  }

  @del('/usuarios/{id}/credenciales-usuario', {
    responses: {
      '200': {
        description: 'Usuario.CredencialesUsuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CredencialesUsuario)) where?: Where<CredencialesUsuario>,
  ): Promise<Count> {
    return this.usuarioRepository.credencialesUsuario(id).delete(where);
  }
}
