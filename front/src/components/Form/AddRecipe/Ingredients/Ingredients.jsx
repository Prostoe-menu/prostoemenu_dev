import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ingredient from './Ingredient/Ingredient';
// import RecipeTitle from '../../RecipeTitle/RecipeTitle';
import Button from '../../../UI/Button/Button';
import addIcon from '../../../../images/add.svg';
import { buttons } from '../../../../utils/constants';
import arrowRight from '../../../../images/arrow-right.svg';
import arrowLeft from '../../../../images/arrow-left.svg';
import {
  addEmptyIngredient,
  changeCurrentStage,
  saveAllIngredients,
} from '../../../../store/slices/form/formSlice';
import Style from './Ingredients.module.scss';

// import getMeasurments from '../../../../helpers/getMeasurements';

const Ingredients = () => {
  const { ingredients } = useSelector((state) => state.form);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(saveAllIngredients());
    dispatch(changeCurrentStage(3));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onGoBack = () => {
    dispatch(changeCurrentStage(1));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const addEmptyInput = () => {
    dispatch(addEmptyIngredient());
  };

  // useEffect(() => {
  //   getMeasurments().then((data) => console.log(data));
  // }, []);

  return (
    <form onSubmit={onSubmit}>
      <section className={Style.ingredients}>
        {/* <RecipeTitle>
        <span className={Style.mobileTitle}>2. </span>Ингредиенты*
      </RecipeTitle> */}
        <div className={Style.textContainer}>
          <p className={Style.text}>
            Добавьте ингредиенты для вашего блюда, укажите их количество.
          </p>
        </div>
        <ul className={Style.ingredients__list}>
          {ingredients.map((ingredient) => (
            <li key={ingredient.elementID}>
              <Ingredient
                ingredientData={ingredient}
                hideButton={ingredients.length <= 1}
              />
            </li>
          ))}
        </ul>
        <Button
          btnClassName="button_border_grey"
          isSubmit={false}
          isDisabled={false}
          onClickBtn={addEmptyInput}
          ariaLabelText="Добавить ингредиент"
        >
          <img className={Style.icon} src={addIcon} alt="Иконка 'плюсик'" />
          Добавить ингредиент
        </Button>
      </section>
      <div className={Style.controls}>
        <Button
          btnClassName={buttons.withBorder.yellow}
          isSubmit={false}
          onClickBtn={onGoBack}
        >
          <img src={arrowLeft} alt="стрелка влево" /> назад
        </Button>
        <Button btnClassName={buttons.withBorder.yellow} isSubmit>
          далее <img src={arrowRight} alt="стрелка вправо" />
        </Button>
      </div>
    </form>
  );
};

export default Ingredients;
