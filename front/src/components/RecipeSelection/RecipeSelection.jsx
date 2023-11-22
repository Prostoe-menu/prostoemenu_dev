import React, { useState } from 'react';
import style from './RecipeSelection.module.scss';
import DropdownSearch from '../UI/Dropdown/DropdownSearch/DropdownSearch';
import useAsync from '../../hooks/useAsync';
import getIngredients from '../../helpers/getIngredients';
import SelectedRecipeList from '../SelectedRecipeList/SelectedRecipeList';

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
    <div className={style.section}>
      <h1 className={style.title}>Из чего будем готовить?</h1>
      <p className={style.text}>
        Поможем найти рецепт на основе ингредиентов, которые у вас уже есть или
        которые планируете купить.
      </p>
      <div className={style.search_container}>
        <DropdownSearch
          inputClassName="input_type_home"
          inputPlaceholder="Начните вводить название продукта"
          onChooseItem={handleIngredientSelection}
          isDropdownOpen={isIngredientDropdownOpen}
          onInputChange={handleNameInput}
          setIsDropdownOpen={setIsIngredientDropdownOpen}
          requiredData={ingredientsApiData}
        />
        <button className={style.search_btn} type="button">
          Подобрать рецепт
        </button>
      </div>
      <SelectedRecipeList selected={selected} setSelected={setSelected} />
    </div>
  );
};

export default RecipeSelection;
