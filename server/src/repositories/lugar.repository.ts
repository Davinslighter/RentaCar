import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Lugar, LugarRelations, Departamento, Ciudad} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {CiudadRepository} from './ciudad.repository';

export class LugarRepository extends DefaultCrudRepository<
  Lugar,
  typeof Lugar.prototype.id,
  LugarRelations
> {

  public readonly departamento: HasOneRepositoryFactory<Departamento, typeof Lugar.prototype.id>;

  public readonly ciudad: HasOneRepositoryFactory<Ciudad, typeof Lugar.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Lugar, dataSource);
    this.ciudad = this.createHasOneRepositoryFactoryFor('ciudad', ciudadRepositoryGetter);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.departamento = this.createHasOneRepositoryFactoryFor('departamento', departamentoRepositoryGetter);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
