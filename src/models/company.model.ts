import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {CompanyData} from './company-data.model';
import {User} from './user.model';

@model({
  settings: {
    indexes: {
      uniqueUserId: {
        keys: {
          userId: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class Company extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    index: true,
    unique: true,
  })
  companyName: string;

  @belongsTo(() => User, {name: 'company'})
  userId: string;

  @hasMany(() => CompanyData, {keyTo: 'companyId'})
  companyData: CompanyData[];

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
