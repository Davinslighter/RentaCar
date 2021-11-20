import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Solicitud, Lugar} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {LugarRepository} from './lugar.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Cliente.prototype.id>;

  public readonly lugar: HasOneRepositoryFactory<Lugar, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('LugarRepository') protected lugarRepositoryGetter: Getter<LugarRepository>,
  ) {
    super(Cliente, dataSource);
    this.lugar = this.createHasOneRepositoryFactoryFor('lugar', lugarRepositoryGetter);
    this.registerInclusionResolver('lugar', this.lugar.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
