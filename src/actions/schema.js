import { schema } from 'normalizr';

export const beer = new schema.Entity('beers');
export const arrayOfBeers = [beer];
