// Uncomment these imports to begin using these cool features!

import {TokenService, UserService} from '@loopback/authentication';
import {
  Credentials,
  TokenServiceBindings,
  User,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getModelSchemaRef, HttpErrors, post, requestBody} from '@loopback/rest';
import _ from 'lodash';
import {PasswordHasherBindings, UserServiceBindings} from '../keys';
import {UserRepository} from '../repositories';
import {
  PasswordHasher,
  UserManagementService,
  validateCredentials,
} from '../services';
import {NewUserRequest} from './user.controller';

// import {inject} from '@loopback/core';

export class AdminController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @inject(UserServiceBindings.USER_SERVICE)
    public userManagementService: UserManagementService,
  ) {}

  @post('/admin', {
    responses: {
      '200': {
        description: 'Admin',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async createAdmin(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewAdminUser',
          }),
        },
      },
    })
    admin: NewUserRequest,
  ): Promise<User> {
    // All new users have the "customer" role by default
    admin.roles = ['admin'];
    // ensure a valid email value and password value
    validateCredentials(_.pick(admin, ['email', 'password']));

    try {
      return await this.userManagementService.createUser(admin);
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }
}
