import {Entity, model, property} from '@loopback/repository';

@model()
export class Tables extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  fields: string[];

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  years: number[];

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Tables>) {
    super(data);
  }
}

export interface TablesRelations {
  // describe navigational properties here
}

export type TablesWithRelations = Tables & TablesRelations;
