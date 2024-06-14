/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeIngredientMeasureUnits,
  changeIngredientVolume,
  saveIngredient,
} from 'store/slices/form/formSlice';
import { DropdownMenu, DropdownSearch } from 'ui/Dropdown';
import Input from 'ui/Input';
import getIngredients from 'helpers/getIngredients';
import useClickOutside from 'helpers/useClickOutside';
import useAsync from 'hooks/useAsync';
import { TEXT_INPUT_ERROR_MESSAGE, TEXT_INPUT_PATTERN } from 'utils/constants';
import styles from './InputsContainer.module.scss';

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
  const [isIngredientDropdownOpen, setIsIngredientDropdownOpen] =
    useState(false);
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);

  const dispatch = useDispatch();

  const { value: ingredientsApiData } = useAsync(
    getIngredients,
    query,
    true,
    800
  );

  const selectIngredientRef = useClickOutside(() =>
    setIsIngredientDropdownOpen(false)
  );
  const selectMeasureInputRef = useClickOutside(() =>
    setIsUnitDropdownOpen(false)
  );

  const handleIngredientSelection = (ingredient) => {
    setIsIngredientDropdownOpen(false);
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
        setIsIngredientDropdownOpen(true);
      }, 1100);
    } else {
      setIsIngredientDropdownOpen(false);
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

  const handleUnitSelection = (measureUnit) => {
    dispatch(
      changeIngredientMeasureUnits({
        measureUnit,
        id: ingredientData.elementID,
      })
    );
    setIsUnitDropdownOpen(false);
  };

  return (
    <div className={styles.container}>
      <DropdownSearch
        dropdownClassName="dropdownSearch_type_ingredient"
        isDropdownOpen={isIngredientDropdownOpen}
        setIsDropdownOpen={setIsIngredientDropdownOpen}
        selectItemRef={selectIngredientRef}
        inputClassName="input_type_name"
        isInputError={error === 'name'}
        inputRegister={register}
        inputName={`ingredient[${index}].name`}
        inputRequiredValue={
          ingredients[0].name === '' && ingredients.length <= 1
        }
        inputRequiredMessage="Добавьте в рецепт минимум 1 ингредиент"
        inputPatternValue={TEXT_INPUT_PATTERN}
        inputPatternMessage={TEXT_INPUT_ERROR_MESSAGE}
        onInputChange={handleNameInput}
        inputPlaceholder="Начните вводить название"
        inputValue={query}
        onChooseItem={handleIngredientSelection}
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
        onChange={handleVolumeInput}
        placeholderText="0"
        inputValue={ingredientData.volume}
        inputType="number"
        inputStep="0.1"
      />
      <DropdownMenu
        dropdownClassName="dropdownMenu_type_measure-unit"
        isDropdownOpen={isUnitDropdownOpen}
        setIsDropdownOpen={setIsUnitDropdownOpen}
        openDropdownAriaLabelText="Открыть меню единиц измерения"
        previewText={ingredientData.measure}
        selectItemInputRef={selectMeasureInputRef}
        dropdownData={measureUnits}
        chooseItem={handleUnitSelection}
        chooseItemAriaLabelText="Выбрать единицу измерения"
      />
    </div>
  );
};

export default InputsContainer;
