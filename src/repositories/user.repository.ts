import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Company, User, UserCredentials, UserRelations, Highlights, Preferences, Tables} from '../models';
import {CompanyRepository} from './company.repository';
import {UserCredentialsRepository} from './user-credentials.repository';
import {HighlightsRepository} from './highlights.repository';
import {PreferencesRepository} from './preferences.repository';
import {TablesRepository} from './tables.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  public readonly company: HasOneRepositoryFactory<
    Company,
    typeof User.prototype.id
  >;

  public readonly highlights: HasManyRepositoryFactory<Highlights, typeof User.prototype.id>;

  public readonly preferences: HasManyRepositoryFactory<Preferences, typeof User.prototype.id>;

  public readonly tables: HasManyRepositoryFactory<Tables, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
    @repository.getter('CompanyRepository')
    protected companyRepositoryGetter: Getter<CompanyRepository>, @repository.getter('HighlightsRepository') protected highlightsRepositoryGetter: Getter<HighlightsRepository>, @repository.getter('PreferencesRepository') protected preferencesRepositoryGetter: Getter<PreferencesRepository>, @repository.getter('TablesRepository') protected tablesRepositoryGetter: Getter<TablesRepository>,
  ) {
    super(User, dataSource);
    this.tables = this.createHasManyRepositoryFactoryFor('tables', tablesRepositoryGetter,);
    this.registerInclusionResolver('tables', this.tables.inclusionResolver);
    this.preferences = this.createHasManyRepositoryFactoryFor('preferences', preferencesRepositoryGetter,);
    this.registerInclusionResolver('preferences', this.preferences.inclusionResolver);
    this.highlights = this.createHasManyRepositoryFactoryFor('highlights', highlightsRepositoryGetter,);
    this.registerInclusionResolver('highlights', this.highlights.inclusionResolver);
    this.company = this.createHasOneRepositoryFactoryFor(
      'company',
      companyRepositoryGetter,
    );
    this.registerInclusionResolver('company', this.company.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredentials',
      this.userCredentials.inclusionResolver,
    );
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
