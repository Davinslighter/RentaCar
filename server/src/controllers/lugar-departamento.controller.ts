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
  Departamento,
} from '../models';
import {LugarRepository} from '../repositories';

export class LugarDepartamentoController {
  constructor(
    @repository(LugarRepository) protected lugarRepository: LugarRepository,
  ) { }

  @get('/lugars/{id}/departamento', {
    responses: {
      '200': {
        description: 'Lugar has one Departamento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Departamento),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Departamento>,
  ): Promise<Departamento> {
    return this.lugarRepository.departamento(id).get(filter);
  }

  @post('/lugars/{id}/departamento', {
    responses: {
      '200': {
        description: 'Lugar model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Lugar.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {
            title: 'NewDepartamentoInLugar',
            exclude: ['id'],
            optional: ['lugarId']
          }),
        },
      },
    }) departamento: Omit<Departamento, 'id'>,
  ): Promise<Departamento> {
    return this.lugarRepository.departamento(id).create(departamento);
  }

  @patch('/lugars/{id}/departamento', {
    responses: {
      '200': {
        description: 'Lugar.Departamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {partial: true}),
        },
      },
    })
    departamento: Partial<Departamento>,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.lugarRepository.departamento(id).patch(departamento, where);
  }

  @del('/lugars/{id}/departamento', {
    responses: {
      '200': {
        description: 'Lugar.Departamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.lugarRepository.departamento(id).delete(where);
  }
}
