import React, { useState } from 'react';
import SelectedRecipeList from 'components/SelectedRecipeList/SelectedRecipeList';
import DropdownSearch from 'components/UI/Dropdown/DropdownSearch/DropdownSearch';
import getIngredients from 'helpers/getIngredients';
import useAsync from 'hooks/useAsync';
import styles from './RecipeSelection.module.scss';

const RecipeSelection = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [isIngredientDropdownOpen, setIsIngredientDropdownOpen] =
    useState(false);
  const { value: ingredientsApiData } = useAsync(
    getIngredients,
    query,
    true,
    800
  );

  const handleIngredientSelection = (ingredient) => {
    setIsIngredientDropdownOpen(false);
    setQuery(ingredient.name);

    if (!selected.includes(ingredient.name)) {
      setSelected((prevSelected) => [...prevSelected, ingredient.name]);
    }
    setQuery('');
  };

  const handleNameInput = (e) => {
    setQuery(e.target.value);

    if (query.length >= 2) {
      setTimeout(() => {
        setIsIngredientDropdownOpen(true);
      }, 1100);
    } else {
      setIsIngredientDropdownOpen(false);
    }
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
          onChooseItem={handleIngredientSelection}
          isDropdownOpen={isIngredientDropdownOpen}
          inputValue={query}
          onInputChange={handleNameInput}
          setIsDropdownOpen={setIsIngredientDropdownOpen}
          requiredData={ingredientsApiData}
        />
        <button className={styles.search_btn} type="button">
          Подобрать рецепт
        </button>
      </div>
      <SelectedRecipeList selected={selected} setSelected={setSelected} />
    </section>
  );
};

export default RecipeSelection;
