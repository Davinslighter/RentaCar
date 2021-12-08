import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Solicitud, Usuario, Lugar} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {UsuarioRepository} from './usuario.repository';
import {LugarRepository} from './lugar.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Cliente.prototype.id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Cliente.prototype.id>;

  public readonly lugar: HasOneRepositoryFactory<Lugar, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('LugarRepository') protected lugarRepositoryGetter: Getter<LugarRepository>,
  ) {
    super(Cliente, dataSource);
    this.lugar = this.createHasOneRepositoryFactoryFor('lugar', lugarRepositoryGetter);
    this.registerInclusionResolver('lugar', this.lugar.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
