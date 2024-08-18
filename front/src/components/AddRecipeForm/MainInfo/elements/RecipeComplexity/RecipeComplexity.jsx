import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Rating } from '@mui/material';
import Tooltip from 'components/Tooltip/Tooltip';
import TooltipDifficultyContent from 'components/Tooltip/TooltipDifficultyContent/TooltipDifficultyContent';
import { saveRecipeComplexity } from 'store/slices/form/formSlice';
import { ErrorMessage, Title } from '../';
import styles from './RecipeComplexity.module.scss';

export const RecipeComplexity = () => {
  const { control, clearErrors, formState } = useFormContext();

  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.tooltipContainer}>
        <Title>Сложность*</Title>
        <Tooltip toolTipContent={<TooltipDifficultyContent />} width="129px" />
      </div>

      <ul className={styles.stars}>
        <Controller
          name="rating"
          control={control}
          defaultValue={0}
          rules={{ required: true }}
          render={() => (
            <Rating
              name="recipeComplexity"
              defaultValue={0}
              max={3}
              size="large"
              onClick={() => clearErrors('rating')}
              onChange={(event, newValue) => {
                dispatch(saveRecipeComplexity(newValue));
              }}
            />
          )}
        />
      </ul>

      {formState.errors?.rating?.type === 'required' && (
        <ErrorMessage message={'Это поле обязательно к заполнению'} />
      )}
    </div>
  );
};
