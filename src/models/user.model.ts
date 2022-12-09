import {Entity, hasOne, model, property, hasMany} from '@loopback/repository';
import {Company} from './company.model';
import {UserCredentials} from './user-credentials.model';
import {Highlights} from './highlights.model';
import {Preferences} from './preferences.model';
import {Tables} from './tables.model';

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

  @hasOne(() => Company, {keyTo: 'userId'})
  company: Company;

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

  @hasMany(() => Highlights)
  highlights: Highlights[];

  @hasMany(() => Preferences)
  preferences: Preferences[];

  @hasMany(() => Tables)
  tables: Tables[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
