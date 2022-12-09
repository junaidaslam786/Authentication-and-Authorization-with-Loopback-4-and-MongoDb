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
import {Highlights, User} from '../models';
import {UserRepository} from '../repositories';
import {basicAuthorization} from '../services';
import {OPERATION_SECURITY_SPEC} from '../utils';

export class UserHighlightsController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @get('/users/{id}/highlights', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of User has many Highlights',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Highlights)},
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
    @param.query.object('filter') filter?: Filter<Highlights>,
  ): Promise<Highlights[]> {
    return this.userRepository.highlights(id).find(filter);
  }

  @post('/users/{id}/highlights', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Highlights)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Highlights, {
            title: 'NewHighlightsInUser',
            exclude: ['id'],
            optional: ['userId'],
          }),
        },
      },
    })
    highlights: Omit<Highlights, 'id'>,
  ): Promise<Highlights> {
    return this.userRepository.highlights(id).create(highlights);
  }

  @patch('/users/{id}/highlights', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User.Highlights PATCH success count',
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
          schema: getModelSchemaRef(Highlights, {partial: true}),
        },
      },
    })
    highlights: Partial<Highlights>,
    @param.query.object('where', getWhereSchemaFor(Highlights))
    where?: Where<Highlights>,
  ): Promise<Count> {
    return this.userRepository.highlights(id).patch(highlights, where);
  }

  @del('/users/{id}/highlights', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User.Highlights DELETE success count',
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
    @param.query.object('where', getWhereSchemaFor(Highlights))
    where?: Where<Highlights>,
  ): Promise<Count> {
    return this.userRepository.highlights(id).delete(where);
  }
}
