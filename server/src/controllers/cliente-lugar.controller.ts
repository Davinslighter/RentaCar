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
  Cliente,
  Lugar,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteLugarController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/lugar', {
    responses: {
      '200': {
        description: 'Cliente has one Lugar',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Lugar),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Lugar>,
  ): Promise<Lugar> {
    return this.clienteRepository.lugar(id).get(filter);
  }

  @post('/clientes/{id}/lugar', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lugar)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lugar, {
            title: 'NewLugarInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) lugar: Omit<Lugar, 'id'>,
  ): Promise<Lugar> {
    return this.clienteRepository.lugar(id).create(lugar);
  }

  @patch('/clientes/{id}/lugar', {
    responses: {
      '200': {
        description: 'Cliente.Lugar PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lugar, {partial: true}),
        },
      },
    })
    lugar: Partial<Lugar>,
    @param.query.object('where', getWhereSchemaFor(Lugar)) where?: Where<Lugar>,
  ): Promise<Count> {
    return this.clienteRepository.lugar(id).patch(lugar, where);
  }

  @del('/clientes/{id}/lugar', {
    responses: {
      '200': {
        description: 'Cliente.Lugar DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Lugar)) where?: Where<Lugar>,
  ): Promise<Count> {
    return this.clienteRepository.lugar(id).delete(where);
  }
}
