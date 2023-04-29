import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import measureInuts from './measure_units';

import getIngredients from '../../../../../../helpers/getIngredients';
import useAsync from '../../../../../../hooks/useAsync';
import {
  saveIngredient,
  changeIngredientVolume,
  changeIngredientMeasureUnits,
} from '../../../../../../store/slices/form/formSlice';
import Style from './InputsContainer.module.scss';

const InputsContainer = ({ ingredientData }) => {
  const [query, setQuery] = useState(ingredientData.name || '');

  const dispatch = useDispatch();

  const { value: ingredients } = useAsync(getIngredients, query, true, 1000);

  const [openIngredientDropdown, setOpenIngredientDropdown] = useState(false);
  const [openUnitDropdown, setOpenUnitDropdown] = useState(false);

  const chooseIngredient = (ingredient) => {
    setOpenIngredientDropdown(false);
    setQuery(ingredient.name);
    dispatch(
      saveIngredient({ id: ingredientData.elementID, name: ingredient.name })
    );
  };

  const chooseUnit = (measureUnit) => {
    dispatch(
      changeIngredientMeasureUnits({
        measureUnit,
        id: ingredientData.elementID,
      })
    );
    setOpenUnitDropdown(false);
  };

  const handleNameInput = (e) => {
    setQuery(e.target.value);

    // eslint-disable-next-line no-unused-expressions
    query.length >= 2
      ? setOpenIngredientDropdown(true)
      : setOpenIngredientDropdown(false);
  };

  const handleVolumeInput = (e) => {
    dispatch(
      changeIngredientVolume({
        volume: parseInt(e.target.value, 10)
          ? parseInt(e.target.value, 10)
          : '',
        id: ingredientData.elementID,
      })
    );
  };

  return (
    <div className={Style.container}>
      <div className={`${Style.dropdownMenu} ${Style.dropdownMenu_type_name}`}>
        <input
          className={`${Style.input} ${Style.input_type_name}`}
          name="ingredientName"
          placeholder="Начните вводить название"
          onChange={handleNameInput}
          autoComplete="off"
          value={query}
        />
        <ul
          className={`${Style.dropdownMenu__options} ${
            Style.dropdownMenu__options_type_ingredients
          } ${openIngredientDropdown && Style.dropdownMenu__options_visible}`}
        >
          {ingredients?.map((ingredient) => (
            <li className={Style.dropdownMenu__option} key={ingredient.id}>
              <div
                onClick={chooseIngredient.bind(null, ingredient)}
                onKeyDown={chooseIngredient.bind(null, ingredient)}
                role="button"
                tabIndex="0"
                aria-label="Выбрать ингредиент"
                style={{
                  width: '100%',
                }}
              >
                {ingredient.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <input
        className={`${Style.input} ${Style.input_type_quantity}`}
        name="ingredientQuantity"
        type="text"
        pattern="[0-9]*"
        placeholder="0"
        autoComplete="off"
        onChange={handleVolumeInput}
        value={ingredientData.volume}
      />
      <div
        className={`${Style.dropdownMenu} ${Style.dropdownMenu_type_measureInuts}`}
      >
        <div
          className={`${Style.input} ${Style.input_type_dropdown}`}
          onClick={() => setOpenUnitDropdown((prevValue) => !prevValue)}
          onKeyDown={() => setOpenUnitDropdown((prevValue) => !prevValue)}
          role="button"
          tabIndex="0"
          aria-label="Открыть меню единиц измерения"
        >
          <span>{ingredientData.measure}</span>
          <ExpandMoreIcon
            style={{
              color: '#818181',
              stroke: '#ffffff',
              strokeWidth: 1,
            }}
          />
        </div>
        <ul
          className={`${Style.dropdownMenu__options} ${
            Style.dropdownMenu__options_type_measureUnits
          } ${openUnitDropdown && Style.dropdownMenu__options_visible}`}
        >
          {measureInuts.map((item) => (
            <li className={Style.dropdownMenu__option}>
              <div
                onClick={() => chooseUnit(item)}
                onKeyDown={() => chooseUnit(item)}
                role="button"
                tabIndex="0"
                aria-label="Выбрать единицу измерения"
                style={{
                  width: '100%',
                }}
              >
                {item}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InputsContainer;
