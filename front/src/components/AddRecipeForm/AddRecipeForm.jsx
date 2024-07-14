import { useSelector } from 'react-redux';
import ProgressBar from 'components/AddRecipeForm/ProgressBar/ProgressBar';
import StageFour from 'components/AddRecipeForm/Stages/StageFour';
import StageOne from 'components/AddRecipeForm/Stages/StageOne';
import StageThree from 'components/AddRecipeForm/Stages/StageThree';
import StageTwo from 'components/AddRecipeForm/Stages/StageTwo';
import PageTitle from 'components/PageTitle/PageTitle';
import styles from './AddRecipeForm.module.scss';

const AddRecipeForm = () => {
  const currentStage = useSelector((state) => state.form.currentFormStage);

  return (
    <>
      <PageTitle>Добавить новый рецепт</PageTitle>

      <section className={styles.container}>
        <ProgressBar activeStep={currentStage} />
        {currentStage === 1 && <StageOne />}
        {currentStage === 2 && <StageTwo />}
        {currentStage === 3 && <StageThree />}
        {currentStage === 4 && <StageFour />}
      </section>
    </>
  );
};

export default AddRecipeForm;
