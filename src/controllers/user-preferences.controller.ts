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
import {Preferences, User} from '../models';
import {UserRepository} from '../repositories';
import {basicAuthorization} from '../services';
import {OPERATION_SECURITY_SPEC} from '../utils';

export class UserPreferencesController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @get('/users/{id}/preferences', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of User has many Preferences',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Preferences)},
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
    @param.query.object('filter') filter?: Filter<Preferences>,
  ): Promise<Preferences[]> {
    return this.userRepository.preferences(id).find(filter);
  }

  @post('/users/{id}/preferences', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Preferences)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preferences, {
            title: 'NewPreferencesInUser',
            exclude: ['id'],
            optional: ['userId'],
          }),
        },
      },
    })
    preferences: Omit<Preferences, 'id'>,
  ): Promise<Preferences> {
    return this.userRepository.preferences(id).create(preferences);
  }

  @patch('/users/{id}/preferences', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User.Preferences PATCH success count',
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
          schema: getModelSchemaRef(Preferences, {partial: true}),
        },
      },
    })
    preferences: Partial<Preferences>,
    @param.query.object('where', getWhereSchemaFor(Preferences))
    where?: Where<Preferences>,
  ): Promise<Count> {
    return this.userRepository.preferences(id).patch(preferences, where);
  }

  @del('/users/{id}/preferences', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User.Preferences DELETE success count',
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
    @param.query.object('where', getWhereSchemaFor(Preferences))
    where?: Where<Preferences>,
  ): Promise<Count> {
    return this.userRepository.preferences(id).delete(where);
  }
}
