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
  Vehiculo,
  Lugar,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoLugarController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/lugar', {
    responses: {
      '200': {
        description: 'Vehiculo has one Lugar',
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
    return this.vehiculoRepository.lugar(id).get(filter);
  }

  @post('/vehiculos/{id}/lugar', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lugar)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lugar, {
            title: 'NewLugarInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) lugar: Omit<Lugar, 'id'>,
  ): Promise<Lugar> {
    return this.vehiculoRepository.lugar(id).create(lugar);
  }

  @patch('/vehiculos/{id}/lugar', {
    responses: {
      '200': {
        description: 'Vehiculo.Lugar PATCH success count',
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
    return this.vehiculoRepository.lugar(id).patch(lugar, where);
  }

  @del('/vehiculos/{id}/lugar', {
    responses: {
      '200': {
        description: 'Vehiculo.Lugar DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Lugar)) where?: Where<Lugar>,
  ): Promise<Count> {
    return this.vehiculoRepository.lugar(id).delete(where);
  }
}
