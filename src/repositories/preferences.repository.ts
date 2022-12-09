import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Preferences, PreferencesRelations} from '../models';

export class PreferencesRepository extends DefaultCrudRepository<
  Preferences,
  typeof Preferences.prototype.id,
  PreferencesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Preferences, dataSource);
  }
}
