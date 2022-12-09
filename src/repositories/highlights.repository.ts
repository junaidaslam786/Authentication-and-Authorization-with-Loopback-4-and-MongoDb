import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Highlights, HighlightsRelations} from '../models';

export class HighlightsRepository extends DefaultCrudRepository<
  Highlights,
  typeof Highlights.prototype.id,
  HighlightsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Highlights, dataSource);
  }
}
