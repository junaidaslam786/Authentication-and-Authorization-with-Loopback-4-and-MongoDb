import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Company} from './company.model';

@model({settings: {strict: false}})
export class CompanyData extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
    unique: true,
    jsonSchema: {
      format: 'date',
    },
  })
  year: string;

  @property({
    type: 'date',
    required: true,
    unique: true,
    jsonSchema: {
      format: 'date',
    },
  })
  month: string;

  @property({
    type: 'number',
    default: 0,
  })
  earnings?: number;

  @property({
    type: 'number',
    default: 0,
  })
  expenses?: number;

  @property({
    type: 'number',
    default: 0,
  })
  costs?: number;

  @belongsTo(() => Company, {name: 'companyData'})
  companyId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CompanyData>) {
    super(data);
  }
}

export interface CompanyDataRelations {
  // describe navigational properties here
}

export type CompanyDataWithRelations = CompanyData & CompanyDataRelations;
