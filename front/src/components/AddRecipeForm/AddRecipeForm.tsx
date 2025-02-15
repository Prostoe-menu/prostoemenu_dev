import { useSelector } from 'react-redux';
import Ingredients from 'components/AddRecipeForm/Ingredients/Ingredients';
import ProgressBar from 'components/AddRecipeForm/ProgressBar/ProgressBar';
import { selectStepIndex } from 'store/slices/form/formSelect';
import CookingSteps from './CookingSteps/CookingSteps';
import MainInfo from './MainInfo/MainInfo';
import StepContainer from './StepContainer';
import styles from './AddRecipeForm.module.scss';

const STEPS = [
  {
    title: 'Основная информация',
    subtitle: 'Поля, отмеченные *, обязательны для заполнения',
    component: <MainInfo />,
    path: 'main',
  },
  {
    title: 'Ингредиенты',
    subtitle: 'Добавьте ингредиенты для вашего блюда, укажите их количество',
    component: <Ingredients />,
    path: 'ingredients',
  },
  {
    title: 'Этапы готовки',
    component: <CookingSteps />,
    path: 'steps',
  },
];

const AddRecipeForm = () => {
  const currentStepIndex = useSelector(selectStepIndex);

  const currentStep = STEPS[currentStepIndex - 1] || STEPS[0];

  const { title, subtitle, component } = currentStep;

  return (
    <section className={styles.container}>
      <ProgressBar currentIndex={currentStepIndex} steps={STEPS} />

      <StepContainer title={title} subtitle={subtitle}>
        {component}
      </StepContainer>
    </section>
  );
};

export default AddRecipeForm;
