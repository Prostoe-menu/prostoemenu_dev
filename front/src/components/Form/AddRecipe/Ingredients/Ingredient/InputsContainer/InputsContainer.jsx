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
  const [cursor, setCursor] = useState(-1);
  const [query, setQuery] = useState(ingredientData.name || '');

  const dispatch = useDispatch();

  const { value: ingredients } = useAsync(getIngredients, query, true, 800);

  const [openIngredientDropdown, setOpenIngredientDropdown] = useState(false);
  const selectIngredient = useClickOutside(() =>
    setOpenIngredientDropdown(false)
  );

  const [openUnitDropdown, setOpenUnitDropdown] = useState(false);
  const selectMeasureInut = useClickOutside(() => setOpenUnitDropdown(false));

  const scrollToSelected = (ref) => {
    const selectedItem = ref?.current?.children[cursor];

    if (selectedItem !== undefined) {
      selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const handleKeyboardNavigation = (
    e,
    ref,
    isVisible,
    items,
    setVisibility,
    chooseItem
  ) => {
    if (e.key === 'ArrowDown') {
      if (isVisible) {
        e.preventDefault();
        setCursor((c) => (c < items.length - 1 ? c + 1 : c));
      } else {
        setVisibility(true);
      }
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }
    if (e.key === 'Escape') {
      setVisibility(false);
      setCursor(-1);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (items === measureUnits) {
        chooseItem(items[cursor].unitName);
      } else {
        chooseItem(items[cursor]);
      }
    }

    scrollToSelected(ref);
  };

  const chooseIngredient = (ingredient) => {
    setOpenIngredientDropdown(false);
    setQuery(ingredient.name);
    dispatch(
      saveIngredient({ id: ingredientData.elementID, name: ingredient.name })
    );
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
    const inputValue = e.target.value;
    const normalizedValue = inputValue.replace(',', '.');
    dispatch(
      changeIngredientVolume({
        volume: normalizedValue,
        id: ingredientData.elementID,
      })
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

  return (
    <div className={Style.container}>
      <div className={`${Style.dropdownMenu} ${Style.dropdownMenu_type_name}`}>
        <input
          className={`${Style.input} ${Style.input_type_name}`}
          {...register(`ingredient[${index}].name`, {
            onChange: handleNameInput,
            required: {
              value: index === 0,
              message: 'Добавьте в рецепт минимум 1 ингредиент',
            },
            pattern: {
              value: /[A-Za-zА-Яа-яЁё0-9\s!-"№;%:?*()'/.,\\«»]/gi,
              message: `Допустимы кириллица, латиница, цифры и спецсимволы !-"№;%:?*()'/.,\\«»`,
            },
          })}
          onKeyDown={(e) =>
            handleKeyboardNavigation(
              e,
              selectIngredient,
              openIngredientDropdown,
              ingredients,
              setOpenIngredientDropdown,
              chooseIngredient
            )
          }
          placeholder="Начните вводить название"
          autoComplete="off"
          value={query}
        />
        <ul
          className={`${Style.dropdownMenu__options} ${
            Style.dropdownMenu__options_type_ingredients
          } ${openIngredientDropdown && Style.dropdownMenu__options_visible}`}
          ref={selectIngredient}
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
            return ingredients?.map((ingredient, idx) => (
              <li className={Style.listItem} key={ingredient.id}>
                <div
                  className={`${Style.dropdownMenu__option} ${
                    idx === cursor && Style.dropdownMenu__option_active
                  }`}
                  onClick={() => chooseIngredient(ingredient)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setOpenIngredientDropdown(false);
                    }
                  }}
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
        {...register(`ingredient[${index}].quantity`, {
          valueAsNumber: true,
          required: 'Введите количество ингредиента',
          min: {
            value: 0.1,
            message: 'Количество должно быть более нуля',
          },
          onChange: handleVolumeInput,
        })}
        type="number"
        step="0.1"
        placeholder="0"
        autoComplete="off"
        value={ingredientData.volume}
      />
      <div
        className={`${Style.dropdownMenu} ${Style.dropdownMenu_type_measureInuts}`}
      >
        <div
          className={`${Style.input} ${Style.input_type_dropdown}`}
          onClick={() => setOpenUnitDropdown((prevValue) => !prevValue)}
          onKeyDown={(e) =>
            handleKeyboardNavigation(
              e,
              selectMeasureInut,
              openUnitDropdown,
              measureUnits,
              setOpenUnitDropdown,
              chooseUnit
            )
          }
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
          ref={selectMeasureInut}
        >
          {measureUnits?.map((item, idx) => (
            <li className={Style.listItem} key={item.id}>
              <div
                className={`${Style.dropdownMenu__option} ${
                  idx === cursor && Style.dropdownMenu__option_active
                }`}
                key={item.id}
                onClick={() => chooseUnit(item.unitName)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setOpenUnitDropdown(false);
                  }
                }}
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
