import { useState } from 'react';
import SelectedIngredients from 'components/SelectedIngredients/SelectedIngredients';
import Button from 'ui/Button';
import { DropdownSearch } from 'ui/Dropdown';
import getIngredients from 'helpers/getIngredients';
import useAsync from 'hooks/useAsync';
import styles from './RecipeSearch.module.scss';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);

  const { value: ingredientsApiData, loading } = useAsync(
    getIngredients,
    query,
    true,
    800
  );

  const handleIngredientSelection = (ingredient) => {
    setQuery(ingredient.name);

    if (!selected.includes(ingredient.name)) {
      setSelected((prevSelected) => [...prevSelected, ingredient.name]);
    }
    setQuery('');
  };

  const handleNameInput = (value) => {
    setQuery(value);
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Из чего будем готовить?</h1>
      <p className={styles.text}>
        Поможем найти рецепт на основе ингредиентов, которые у вас уже есть или
        которые планируете купить.
      </p>
      <div className={styles.search_container}>
        <DropdownSearch
          inputClassName="input_type_home"
          inputPlaceholder="Начните вводить название продукта"
          notFoundMessage="Такого ингредиента не найдено"
          onChooseItem={handleIngredientSelection}
          inputValue={query}
          onInputChange={handleNameInput}
          requiredData={ingredientsApiData}
          isLoading={loading}
        />
        <Button className={styles.search_btn} type="button">
          Подобрать рецепт
        </Button>
      </div>
      <SelectedIngredients selected={selected} setSelected={setSelected} />
    </section>
  );
};

export default RecipeSearch;
