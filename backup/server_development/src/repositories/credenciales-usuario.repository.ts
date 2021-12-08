import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CredencialesUsuario, CredencialesUsuarioRelations} from '../models';

export class CredencialesUsuarioRepository extends DefaultCrudRepository<
  CredencialesUsuario,
  typeof CredencialesUsuario.prototype.id,
  CredencialesUsuarioRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(CredencialesUsuario, dataSource);
  }
}
