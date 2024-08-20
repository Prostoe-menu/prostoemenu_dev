import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  changeCurrentStage,
  saveGeneralRecipeInfo,
} from 'store/slices/form/formSlice';
import Button from 'ui/Button';
import PhotoButton from 'ui/PhotoButton';
import { CookTime } from './elements';
import {
  Description,
  RecipeComplexity,
  RecipeName,
  RecipePortions,
} from './sections';
import styles from './MainInfo.module.scss';

const defaultValues = {
  recipeName: '',
  recipeComplexity: 0,
  portions: 0,
  allhours: null,
  allminutes: null,
  cookhours: null,
  cookminutes: null,
  recipedesc: '',
};

const MainInfo = () => {
  const dispatch = useDispatch();

  const methods = useForm({
    defaultValues,
    mode: 'onTouched',
  });

  // eslint-disable-next-line
  const onSubmit = (data) => {
    console.log('step1 data: ', data);
    dispatch(saveGeneralRecipeInfo(data));
    dispatch(changeCurrentStage(2));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // const allmins = () => {
  //   console.log(getValues('allminutes'));
  //   const { allminutes } = getValues();
  //   console.log(!!allminutes);
  //   return !!allminutes;
  // };

  // const cookmins = () => {
  //   if (methods.getValues('cookminutes') === undefined || '') {
  //     return true;
  //   }
  //   return false;
  // };

  console.log('MainInfo render');

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
          <h4 className={styles.title}>Время приготовления*</h4>

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

        <section>
          <h4 className={styles.title}>Описание</h4>
          <Description />
        </section>

        <div>
          <p className={styles.title}>Фото готового блюда</p>
          <PhotoButton />
          <p className={styles.fotoReqs}>Требования к фото:</p>
          <ul className={styles.reqlist}>
            <li className={styles.reqlist_item}>
              Форматы JPEG, JPG, PNG или WEBP
            </li>
            <li className={styles.reqlist_item}>
              Размер файла не больше&nbsp;
              <span className={styles.reqlist_accent}>5 мб</span>
            </li>
          </ul>
        </div>
        <div className={styles.controls}>
          <Button className={styles.button_primary} type="submit">
            Далее
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
export default MainInfo;
