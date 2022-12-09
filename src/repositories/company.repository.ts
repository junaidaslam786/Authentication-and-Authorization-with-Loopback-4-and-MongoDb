import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Company, CompanyRelations, CompanyData} from '../models';
import {CompanyDataRepository} from './company-data.repository';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
> {

  public readonly companyData: HasManyRepositoryFactory<CompanyData, typeof Company.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CompanyDataRepository') protected companyDataRepositoryGetter: Getter<CompanyDataRepository>,
  ) {
    super(Company, dataSource);
    this.companyData = this.createHasManyRepositoryFactoryFor('companyData', companyDataRepositoryGetter,);
    this.registerInclusionResolver('companyData', this.companyData.inclusionResolver);
  }
}
