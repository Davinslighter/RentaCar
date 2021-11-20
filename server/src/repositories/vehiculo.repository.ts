import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Lugar} from '../models';
import {LugarRepository} from './lugar.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly lugar: HasOneRepositoryFactory<Lugar, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LugarRepository') protected lugarRepositoryGetter: Getter<LugarRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.lugar = this.createHasOneRepositoryFactoryFor('lugar', lugarRepositoryGetter);
    this.registerInclusionResolver('lugar', this.lugar.inclusionResolver);
  }
}
