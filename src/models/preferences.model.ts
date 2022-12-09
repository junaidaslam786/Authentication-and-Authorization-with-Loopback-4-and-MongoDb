import {Entity, model, property} from '@loopback/repository';

@model()
export class Preferences extends Entity {
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
    type: 'number',
    required: true,
  })
  yearFrom: number;

  @property({
    type: 'number',
    required: true,
  })
  yearTo: number;

  @property({
    type: 'number',
    required: true,
  })
  monthFrom: number;

  @property({
    type: 'number',
    required: true,
  })
  monthTo: number;

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Preferences>) {
    super(data);
  }
}

export interface PreferencesRelations {
  // describe navigational properties here
}

export type PreferencesWithRelations = Preferences & PreferencesRelations;
