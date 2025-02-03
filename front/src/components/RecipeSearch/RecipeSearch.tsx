import { MouseEvent, useState } from 'react';
import SelectedIngredients from 'components/SelectedIngredients';
import { fetchRecipesByIngredients } from 'store/slices/search/searchThunk';
import Button from 'ui/Button';
import { DropdownSearch } from 'ui/Dropdown';
import useAsync from 'hooks/useAsync';
import { API } from 'api/api';
import { useAppDispatch } from 'store/hooks';
import { IIngredient, TIngredientsResponse } from 'shared/types/ingredients';
import styles from './RecipeSearch.module.scss';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const { value: ingredientsApiData, loading } = useAsync<TIngredientsResponse>(
    API.getIngredients,
    query,
    true,
    800
  );

  const getIngredientsItems = () => {
    return ingredientsApiData?.data?.results || [];
  };

  const handleIngredientSelection = (ingredient: IIngredient) => {
    if (!selected.includes(ingredient.name)) {
      setSelected((prevSelected) => [...prevSelected, ingredient.name]);
    }
    setQuery('');
  };

  const handleNameInput = (value: string) => {
    setQuery(value);
  };

  const searchHandler = (event: MouseEvent) => {
    event.preventDefault();

    dispatch(fetchRecipesByIngredients(selected));
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Из чего будем готовить?</h1>

      <p className={styles.text}>
        Поможем найти рецепт на основе ингредиентов, которые у вас уже есть или
        которые планируете купить.
      </p>

      <div className={styles.сontainer}>
        <DropdownSearch
          inputPlaceholder="Начните вводить название продукта"
          notFoundMessage="Такого ингредиента не найдено"
          onChooseItem={handleIngredientSelection}
          inputValue={query}
          onInputChange={handleNameInput}
          requiredData={getIngredientsItems()}
          isLoading={loading}
        />

        <Button
          type="button"
          onClick={searchHandler}
          className={styles.searchBtn}
        >
          Подобрать рецепт
        </Button>

        <SelectedIngredients selected={selected} setSelected={setSelected} />
      </div>
    </section>
  );
};

export default RecipeSearch;
