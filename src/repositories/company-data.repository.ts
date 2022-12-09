import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {CompanyData, CompanyDataRelations} from '../models';

export class CompanyDataRepository extends DefaultCrudRepository<
  CompanyData,
  typeof CompanyData.prototype.id,
  CompanyDataRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(CompanyData, dataSource);
  }
}
