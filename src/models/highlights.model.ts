import {Entity, model, property} from '@loopback/repository';

@model()
export class Highlights extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  highlight: string;

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Highlights>) {
    super(data);
  }
}

export interface HighlightsRelations {
  // describe navigational properties here
}

export type HighlightsWithRelations = Highlights & HighlightsRelations;
