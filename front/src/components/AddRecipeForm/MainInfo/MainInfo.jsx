import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainInfo } from 'store/slices/form/formSelect';
import { nextStep, saveRecipeInfo } from 'store/slices/form/formSlice';
import Button from 'ui/Button';
import { RecipePhoto } from './sections/RecipePhoto/RecipePhoto';
import { CookTime, Title } from './elements';
import {
  Description,
  RecipeComplexity,
  RecipeName,
  RecipePortions,
} from './sections';
import styles from './MainInfo.module.scss';

const MainInfo = () => {
  const dispatch = useDispatch();

  const defaultValues = useSelector(selectMainInfo);

  const methods = useForm({
    defaultValues,
    mode: 'onTouched',
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line
    console.log('step1 data: ', data);

    dispatch(saveRecipeInfo(data));
    dispatch(nextStep());

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.mainInfo}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <RecipeName />

        <section className={styles.complexityWrap}>
          <RecipeComplexity />
          <RecipePortions />
        </section>

        <section>
          <Title>Время приготовления*</Title>

          <div className={styles.cookTimeWrap}>
            <CookTime
              title="Всего"
              hoursName="allhours"
              minutesName="allminutes"
            />
            <CookTime
              title="Время «У плиты»"
              hoursName="cookhours"
              minutesName="cookminutes"
              tooltip="Время активной готовки блюда без учёта того, сколько оно варится, жарится, запекается и т.д."
            />
          </div>
        </section>

        <Description />

        <RecipePhoto />

        <div className={styles.controls}>
          <Button type="submit">Далее</Button>
        </div>
      </form>
    </FormProvider>
  );
};
export default MainInfo;
