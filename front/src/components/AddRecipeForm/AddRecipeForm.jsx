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
    component: <MainInfo />,
    path: 'main',
  },
  {
    title: 'Ингредиенты',
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

  const currentStep = STEPS[currentStepIndex - 1];

  const { title, component } = currentStep;

  return (
    <section className={styles.container}>
      <ProgressBar currentIndex={currentStepIndex} steps={STEPS} />

      <StepContainer title={title}>{component}</StepContainer>
    </section>
  );
};

export default AddRecipeForm;
