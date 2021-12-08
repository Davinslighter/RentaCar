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
  Lugar,
  Ciudad,
} from '../models';
import {LugarRepository} from '../repositories';

export class LugarCiudadController {
  constructor(
    @repository(LugarRepository) protected lugarRepository: LugarRepository,
  ) { }

  @get('/lugars/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Lugar has one Ciudad',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ciudad),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ciudad>,
  ): Promise<Ciudad> {
    return this.lugarRepository.ciudad(id).get(filter);
  }

  @post('/lugars/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Lugar model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ciudad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Lugar.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {
            title: 'NewCiudadInLugar',
            exclude: ['id'],
            optional: ['lugarId']
          }),
        },
      },
    }) ciudad: Omit<Ciudad, 'id'>,
  ): Promise<Ciudad> {
    return this.lugarRepository.ciudad(id).create(ciudad);
  }

  @patch('/lugars/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Lugar.Ciudad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Partial<Ciudad>,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.lugarRepository.ciudad(id).patch(ciudad, where);
  }

  @del('/lugars/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Lugar.Ciudad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.lugarRepository.ciudad(id).delete(where);
  }
}
