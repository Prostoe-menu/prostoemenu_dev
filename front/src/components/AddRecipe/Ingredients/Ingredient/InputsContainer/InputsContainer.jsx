import React from 'react';
import Style from './InputsContainer.module.scss';

const Ingredient = ({ isHidden, isSubstitute = false }) => (
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
    <div className={Style.dropdownContainer}>
      <select
        className={`${Style.input} ${Style.input_type_dropdown}`}
        name={isSubstitute ? 'substituteMeasure' : 'ingredientMeasure'}
      >
        <option value="gram">г</option>
        <option value="gram">г</option>
      </select>
    </div>
  </div>
);

export default Ingredient;
