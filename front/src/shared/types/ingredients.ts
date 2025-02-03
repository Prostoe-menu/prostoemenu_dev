export interface IIngredient {
  id: number;
  name: string;
  category: string;
  sort: number;
}

export type TIngredientsResponse = {
  count: number;
  next: string | null;
  previos: string | null;
  results: Array<IIngredient>;
};