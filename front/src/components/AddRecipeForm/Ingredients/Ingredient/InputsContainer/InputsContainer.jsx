/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getIngredients from '../../../../../helpers/getIngredients';
import useAsync from '../../../../../hooks/useAsync';
import {
  saveIngredient,
  changeIngredientVolume,
  changeIngredientMeasureUnits,
} from '../../../../../store/slices/form/formSlice';
import useClickOutside from '../../../../../helpers/useClickOutside';
import DropdownSearch from '../../../../UI/Dropdown/DropdownSearch/DropdownSearch';
import DropdownMenu from '../../../../UI/Dropdown/DropdownMenu/DropdownMenu';
import Input from '../../../../UI/Input/Input';
import Style from './InputsContainer.module.scss';

const InputsContainer = ({
  index,
  register,
  ingredientData,
  measureUnits,
  error,
  name,
}) => {
  const { ingredients } = useSelector((state) => state.form);
  const [query, setQuery] = useState(ingredientData.name || '');

  const dispatch = useDispatch();

  const { value: ingredientsApiData } = useAsync(
    getIngredients,
    query,
    true,
    800
  );

  const [openIngredientDropdown, setOpenIngredientDropdown] = useState(false);
  const selectIngredientRef = useClickOutside(() =>
    setOpenIngredientDropdown(false)
  );

  const [openUnitDropdown, setOpenUnitDropdown] = useState(false);
  const selectMeasureInputRef = useClickOutside(() =>
    setOpenUnitDropdown(false)
  );

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
      <DropdownSearch
        dropdownClassName="dropdownSearch_type_ingredient"
        isDropdownOpen={openIngredientDropdown}
        setIsDropdownOpen={setOpenIngredientDropdown}
        selectItemRef={selectIngredientRef}
        inputClassName="input_type_name"
        isInputError={error === 'name'}
        inputRegister={register}
        inputName={`ingredient[${index}].name`}
        inputRequiredValue={
          ingredients[0].name === '' && ingredients.length <= 1
        }
        inputRequiredMessage="Добавьте в рецепт минимум 1 ингредиент"
        inputPatternValue={/[A-Za-zА-Яа-яЁё0-9\s!-"№;%:?*()'/.,\\«»]/gi}
        inputPatternMessage={`Допустимы кириллица, латиница, цифры и спецсимволы !-"№;%:?*()'/.,\\«»`}
        onInputChange={handleNameInput}
        inputPlaceholder="Начните вводить название"
        inputValue={query}
        onChooseItem={chooseIngredient}
        requiredData={ingredientsApiData}
        notFoundMessage="Ингредиент не найден"
        ariaLabelText="Выбрать ингредиент"
      />
      <Input
        inputClassName="input_type_quantity"
        isError={
          error === 'quantity' && name === `ingredient[${index}].quantity`
        }
        register={register}
        inputName={`ingredient[${index}].quantity`}
        requiredValue={
          ingredientData.name !== '' && ingredientData.volume === ''
        }
        requiredMessage="Введите количество ингредиента"
        minValue={0.1}
        minMessage="Количество должно быть более нуля"
        handleChangeInput={handleVolumeInput}
        placeholderText="0"
        inputValue={ingredientData.volume}
        inputType="number"
        inputStep="0.1"
      />
      <DropdownMenu
        dropdownClassName="dropdownMenu_type_measure-unit"
        isDropdownOpen={openUnitDropdown}
        setIsDropdownOpen={setOpenUnitDropdown}
        openDropdownAriaLabelText="Открыть меню единиц измерения"
        previewText={ingredientData.measure}
        selectItemInputRef={selectMeasureInputRef}
        dropdownData={measureUnits}
        chooseItem={chooseUnit}
        chooseItemAriaLabelText="Выбрать единицу измерения"
      />
    </div>
  );
};

export default InputsContainer;
