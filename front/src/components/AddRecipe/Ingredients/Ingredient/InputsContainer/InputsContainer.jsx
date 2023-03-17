import React from 'react';
import Style from './InputsContainer.module.scss';

const Ingredient = () => (
  <div className={Style.container}>
    <input
      className={`${Style.input} ${Style.input_type_name}`}
      name="ingredientName"
      placeholder="Начните вводить название"
    />
    <input
      className={`${Style.input} ${Style.input_type_quantity}`}
      name="ingredientQuantity"
      type="number"
      placeholder="0"
    />
    <div className={Style.dropdownContainer}>
      <select
        className={`${Style.input} ${Style.input_type_dropdown}`}
        name="ingredientMeasure"
      >
        <option value="gram">г</option>
        <option value="gram">г</option>
      </select>
    </div>
  </div>
);

export default Ingredient;
