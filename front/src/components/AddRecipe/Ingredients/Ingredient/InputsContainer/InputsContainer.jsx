import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Style from './InputsContainer.module.scss';
import measureInuts from './measure_units';

const Ingredient = ({ isHidden, isSubstitute = false }) => {
  const [selectedUnit, setSelectedUnit] = useState('г');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const chooseUnit = (unit) => {
    setSelectedUnit(unit);
    setIsDropdownOpen(false);
  };
  return (
    <div
      className={`${Style.container} ${
        isSubstitute && isHidden && Style.container_hidden
      }`}
    >
      <input
        className={`${Style.input} ${Style.input_type_name}`}
        name={isSubstitute ? 'substituteName' : 'ingredientName'}
        placeholder="Начните вводить название"
      />
      <input
        className={`${Style.input} ${Style.input_type_quantity}`}
        name={isSubstitute ? 'substituteQuantity' : 'ingredientQuantity'}
        type="number"
        placeholder="0"
      />
      <div className={Style.dropdownMenu}>
        <div
          className={`${Style.input} ${Style.input_type_dropdown}`}
          onClick={() => setIsDropdownOpen(true)}
          onKeyDown={() => setIsDropdownOpen(true)}
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
            isDropdownOpen && Style.dropdownMenu__options_visible
          }`}
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

export default Ingredient;
