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
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Company, User} from '../models';
import {UserRepository} from '../repositories';
import {basicAuthorization} from '../services';
import {OPERATION_SECURITY_SPEC} from '../utils';

export class UserCompanyController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @get('/users/{id}/company', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User has one Company',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Company),
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
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Company>,
  ): Promise<Company> {
    return this.userRepository.company(id).get(filter);
  }

  @post('/users/{id}/company', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Company)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    // @param.query.object('filter') filter?: Filter<Company>,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {
            title: 'NewCompanyInUser',
            exclude: ['id'],
            optional: ['userId'],
          }),
        },
      },
    })
    company: Omit<Company, 'id'>,
  ): Promise<Company> {
    try {
      return await this.userRepository.company(id).create(company);
    } catch (error) {
      // MongoError 11000 duplicate key
      if (
        error.code === 11000 &&
        error.errmsg.includes('index: uniqueCompanyName')
      ) {
        throw new HttpErrors.Conflict('Company Name is already taken');
      } else {
        throw error;
      }
    }
  }

  @patch('/users/{id}/company', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User.Company PATCH success count',
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
          schema: getModelSchemaRef(Company, {partial: true}),
        },
      },
    })
    company: Partial<Company>,
    @param.query.object('where', getWhereSchemaFor(Company))
    where?: Where<Company>,
  ): Promise<Count> {
    return this.userRepository.company(id).patch(company, where);
  }

  @del('/users/{id}/company', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User.Company DELETE success count',
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
    @param.query.object('where', getWhereSchemaFor(Company))
    where?: Where<Company>,
  ): Promise<Count> {
    return this.userRepository.company(id).delete(where);
  }
}
