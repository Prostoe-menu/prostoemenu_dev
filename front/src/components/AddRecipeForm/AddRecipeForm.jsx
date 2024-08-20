import { useSelector } from 'react-redux';
import Ingredients from 'components/AddRecipeForm/Ingredients/Ingredients';
import ProgressBar from 'components/AddRecipeForm/ProgressBar/ProgressBar';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';
import CookingSteps from './CookingSteps/CookingSteps';
import MainInfo from './MainInfo/MainInfo';
import StepContainer from './StepContainer';
import styles from './AddRecipeForm.module.scss';

const STEPS = [
  {
    title: 'Основная информация',
    component: <MainInfo />,
  },
  {
    title: 'Ингредиенты',
    component: <Ingredients />,
  },
  {
    title: 'Этапы готовки',
    component: <CookingSteps />,
  },
  {
    title: 'Дополнительная информация',
    component: <AdditionalInfo />,
  },
];

const AddRecipeForm = () => {
  const currentStepIndex = useSelector((state) => state.form.currentFormStage);

  const step = STEPS[currentStepIndex - 1];

  return (
    <section className={styles.container}>
      <ProgressBar activeStep={currentStepIndex} />

      <StepContainer title={step.title}>{step.component}</StepContainer>
    </section>
  );
};

export default AddRecipeForm;
