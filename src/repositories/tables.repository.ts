import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tables, TablesRelations} from '../models';

export class TablesRepository extends DefaultCrudRepository<
  Tables,
  typeof Tables.prototype.id,
  TablesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Tables, dataSource);
  }
}
