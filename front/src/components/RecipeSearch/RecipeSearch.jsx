import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectedIngredients from 'components/SelectedIngredients/SelectedIngredients';
import { setSelected } from 'store/slices/ingredients/ingredientsSlice';
import { fetchRecipesByIngredients } from 'store/slices/search/searchThunk';
import Button from 'ui/Button';
import { DropdownSearch } from 'ui/Dropdown';
import useAsync from 'hooks/useAsync';
import styles from './RecipeSearch.module.scss';

import { API } from 'api/api';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const selected = useSelector((state) => state.ingredients.selected);

  const dispatch = useDispatch();

  const { value: ingredientsApiData, loading } = useAsync(
    API.getIngredients,
    query,
    true,
    800
  );

  const handleIngredientSelection = (ingredient) => {
    if (!selected.includes(ingredient.name)) {
      dispatch(setSelected([...selected, ingredient.name]));
    }
    setQuery('');
  };

  const handleNameInput = (value) => {
    setQuery(value);
  };

  const searchHandler = (event) => {
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
          requiredData={ingredientsApiData?.data?.results}
          isLoading={loading}
        />

        <Button
          type="button"
          onClick={searchHandler}
          className={styles.searchBtn}
        >
          Подобрать рецепт
        </Button>

        <SelectedIngredients />
      </div>
    </section>
  );
};

export default RecipeSearch;
