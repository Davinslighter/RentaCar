import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Lugar, LugarRelations, Ciudad, Departamento} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {DepartamentoRepository} from './departamento.repository';

export class LugarRepository extends DefaultCrudRepository<
  Lugar,
  typeof Lugar.prototype.id,
  LugarRelations
> {

  public readonly ciudad: HasOneRepositoryFactory<Ciudad, typeof Lugar.prototype.id>;

  public readonly departamento: HasOneRepositoryFactory<Departamento, typeof Lugar.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>,
  ) {
    super(Lugar, dataSource);
    this.departamento = this.createHasOneRepositoryFactoryFor('departamento', departamentoRepositoryGetter);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
    this.ciudad = this.createHasOneRepositoryFactoryFor('ciudad', ciudadRepositoryGetter);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
