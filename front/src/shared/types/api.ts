import { IIngredient } from './ingredients';
import { IMeasurement } from './measurements';

export interface IResponse<T> {
  count: number;
  next: string | null;
  previos: string | null;
  results: Array<T>;
}

export type TMeasurementsResponse = IResponse<IMeasurement>;

export type TIngredientsResponse = IResponse<IIngredient>;
