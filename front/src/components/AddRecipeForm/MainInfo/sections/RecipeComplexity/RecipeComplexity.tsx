import { Controller, useFormContext } from 'react-hook-form';
import Tooltip from 'components/Tooltip/Tooltip';
import TooltipDifficultyContent from 'components/Tooltip/TooltipDifficultyContent/TooltipDifficultyContent';
import { ErrorMessage, Title } from '../../elements';
import styles from './RecipeComplexity.module.scss';

const inputName = 'complexity';

export const RecipeComplexity = () => {
  const { control, formState } = useFormContext();

  return (
    <div>
      <div className={styles.tooltipContainer}>
        <Title>Сложность*</Title>
        <Tooltip toolTipContent={<TooltipDifficultyContent />} />
      </div>

      <ul className={styles.stars}>
        <Controller
          name={inputName}
          control={control}
          rules={{
            required: 'Укажите сложность рецепта',
            validate: (val) => val > 0 || 'Укажите сложность рецепта',
          }}
          render={({ field }) => {
            return <div {...field}>'***'</div>;
          }}
          // render={({ field }) => (
          //   <Rating
          //     {...field}
          //     max={3}
          //     size="large"
          //     onChange={(e, newValue) => {
          //       field.onChange(newValue);
          //     }}
          //   />
          // )}
        />
      </ul>

      {formState.errors[inputName] && (
        <ErrorMessage
          message={formState.errors[inputName]?.message as string}
        />
      )}
    </div>
  );
};
