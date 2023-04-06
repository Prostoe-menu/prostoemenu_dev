import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Style from './InputsContainer.module.scss';
import measureInuts from './measure_units';
import ingredients from './ingredients';

const InputsContainer = () => {
  const [selectedUnit, setSelectedUnit] = useState('г');
  const [openIngredientDropdown, setOpenIngredientDropdown] = useState(false);
  const [openUnitDropdown, setOpenUnitDropdown] = useState(false);

  const chooseIngredient = () => {
    setOpenIngredientDropdown(false);
  };

  const chooseUnit = (unit) => {
    setSelectedUnit(unit);
    setOpenUnitDropdown(false);
  };
  return (
    <div className={Style.container}>
      <div className={`${Style.dropdownMenu} ${Style.dropdownMenu_type_name}`}>
        <input
          className={`${Style.input} ${Style.input_type_name}`}
          name="ingredientName"
          placeholder="Начните вводить название"
          onChange={() => setOpenIngredientDropdown(true)}
          autoComplete="off"
        />
        <ul
          className={`${Style.dropdownMenu__options} ${
            Style.dropdownMenu__options_type_ingredients
          } ${openIngredientDropdown && Style.dropdownMenu__options_visible}`}
        >
          {/* will be updated after api is received */}
          {ingredients.map((ingredient) => (
            <li className={Style.dropdownMenu__option}>
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
                {ingredient}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <input
        className={`${Style.input} ${Style.input_type_quantity}`}
        name="ingredientQuantity"
        type="number"
        placeholder="0"
        autoComplete="off"
      />
      <div
        className={`${Style.dropdownMenu} ${Style.dropdownMenu_type_measureInuts}`}
      >
        <div
          className={`${Style.input} ${Style.input_type_dropdown}`}
          onClick={() => setOpenUnitDropdown(!openUnitDropdown)}
          onKeyDown={() => setOpenUnitDropdown(!openUnitDropdown)}
          role="button"
          tabIndex="0"
          aria-label="Открыть меню единиц измерения"
        >
          <span>{selectedUnit}</span>
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
