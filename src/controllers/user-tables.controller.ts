import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Tables, User} from '../models';
import {UserRepository} from '../repositories';
import {basicAuthorization} from '../services';
import {OPERATION_SECURITY_SPEC} from '../utils';

export class UserTablesController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @get('/users/{id}/tables', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of User has many Tables',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tables)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'guest'],
    voters: [basicAuthorization],
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Tables>,
  ): Promise<Tables[]> {
    return this.userRepository.tables(id).find(filter);
  }

  @post('/users/{id}/tables', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tables)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tables, {
            title: 'NewTablesInUser',
            exclude: ['id'],
            optional: ['userId'],
          }),
        },
      },
    })
    tables: Omit<Tables, 'id'>,
  ): Promise<Tables> {
    return this.userRepository.tables(id).create(tables);
  }

  @patch('/users/{id}/tables', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User.Tables PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'guest'],
    voters: [basicAuthorization],
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tables, {partial: true}),
        },
      },
    })
    tables: Partial<Tables>,
    @param.query.object('where', getWhereSchemaFor(Tables))
    where?: Where<Tables>,
  ): Promise<Count> {
    return this.userRepository.tables(id).patch(tables, where);
  }

  @del('/users/{id}/tables', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User.Tables DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'guest'],
    voters: [basicAuthorization],
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Tables))
    where?: Where<Tables>,
  ): Promise<Count> {
    return this.userRepository.tables(id).delete(where);
  }
}
