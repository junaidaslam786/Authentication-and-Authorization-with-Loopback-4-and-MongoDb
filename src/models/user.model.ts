import {Entity, hasOne, model, property} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // password: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  roles?: string[];

  // @property({
  //   type: 'string',
  // })
  // resetKey?: string;

  // @property({
  //   type: 'number',
  // })
  // resetCount: number;

  // @property({
  //   type: 'string',
  // })
  // resetTimestamp: string;

  // @property({
  //   type: 'string',
  // })
  // resetKeyTimestamp: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
