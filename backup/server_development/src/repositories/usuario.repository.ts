import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Solicitud, CredencialesUsuario} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {CredencialesUsuarioRepository} from './credenciales-usuario.repository';

export type Credenciales = {
  email: string;
  password: string;
}

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Usuario.prototype.id>;

  public readonly credencialesUsuario: HasOneRepositoryFactory<CredencialesUsuario, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('CredencialesUsuarioRepository') protected credencialesUsuarioRepositoryGetter: Getter<CredencialesUsuarioRepository>,
  ) {
    super(Usuario, dataSource);
    this.credencialesUsuario = this.createHasOneRepositoryFactoryFor('credencialesUsuario', credencialesUsuarioRepositoryGetter);
    this.registerInclusionResolver('credencialesUsuario', this.credencialesUsuario.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }

  async findCredenciales(
    usuarioId: typeof Usuario.prototype.id,
  ): Promise<CredencialesUsuario | undefined> {
    try {
      return await this.credencialesUsuario(usuarioId).get();
    } catch (err) {
      if (err.code == "ENTITY_NOT_FOUND") {
        return undefined;
      }
      throw err;
    }
  }
}
