/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';

import getIngredients from '../../../../../../helpers/getIngredients';
import useAsync from '../../../../../../hooks/useAsync';
import {
  saveIngredient,
  changeIngredientVolume,
  changeIngredientMeasureUnits,
} from '../../../../../../store/slices/form/formSlice';
import useClickOutside from '../../../../../../helpers/useClickOutside';
import Style from './InputsContainer.module.scss';

const InputsContainer = ({ index, register, ingredientData, measureUnits }) => {
  const [query, setQuery] = useState(ingredientData.name || '');

  const dispatch = useDispatch();

  const { value: ingredients } = useAsync(getIngredients, query, true, 800);

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
    if (query.length >= 2) {
      setTimeout(() => {
        setOpenIngredientDropdown(true);
      }, 1100);
    } else {
      setOpenIngredientDropdown(false);
    }
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

  const ingredientMenu = useClickOutside(() =>
    setOpenIngredientDropdown(false)
  );

  const measureInutsMenu = useClickOutside(() => setOpenUnitDropdown(false));

  return (
    <div className={Style.container}>
      <div className={`${Style.dropdownMenu} ${Style.dropdownMenu_type_name}`}>
        <input
          className={`${Style.input} ${Style.input_type_name}`}
          {...register(`ingredient[${index}].name`, {
            onChange: handleNameInput,
            required: index === 0,
            pattern: {
              value: /[A-Za-zА-Яа-яЁё0-9\s!-"№;%:?*()'/.,\\«»]/gi,
              message: `Допустимы кириллица, латиница, цифры и спецсимволы !-"№;%:?*()'/.,\\«»`,
            },
          })}
          placeholder="Начните вводить название"
          autoComplete="off"
          value={query}
        />
        <ul
          className={`${Style.dropdownMenu__options} ${
            Style.dropdownMenu__options_type_ingredients
          } ${openIngredientDropdown && Style.dropdownMenu__options_visible}`}
          ref={ingredientMenu}
        >
          {(() => {
            if (ingredients.length === 0) {
              return (
                <li
                  className={`${Style.dropdownMenu__option} ${Style.dropdownMenu__option_notfound}`}
                >
                  <div
                    style={{
                      width: '100%',
                    }}
                  >
                    Ингредиент не найден
                  </div>
                </li>
              );
            }
            return ingredients?.map((ingredient) => (
              <li className={Style.dropdownMenu__option} key={ingredient.id}>
                <div
                  onClick={() => chooseIngredient(ingredient)}
                  onKeyDown={() => chooseIngredient(ingredient)}
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
            ));
          })()}
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
        ref={measureInutsMenu}
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
          {measureUnits?.map((item) => (
            <li className={Style.dropdownMenu__option} key={item.id}>
              <div
                onClick={() => chooseUnit(item.unitName)}
                onKeyDown={() => chooseUnit(item.unitName)}
                role="button"
                tabIndex="0"
                aria-label="Выбрать единицу измерения"
                style={{
                  width: '100%',
                }}
              >
                {item.unitName}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InputsContainer;
