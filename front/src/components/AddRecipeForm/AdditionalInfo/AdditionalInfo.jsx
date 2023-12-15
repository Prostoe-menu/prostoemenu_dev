import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import arrowLeft from 'assets/images/arrow-left.svg';
import getErrorTypes from '../../../helpers/getErrorTypes';
import {
  changeCurrentStage,
  saveAdditionalInfo,
} from '../../../store/slices/form/formSlice';
import postRecipe from '../../../store/slices/form/formThunk';
import { addNotification } from '../../../store/slices/toast/toastSlice';
import { buttons } from '../../../utils/constants';
import Button from '../../UI/Button/Button';
import styles from './AdditionalInfo.module.scss';
import Legal from './Legal/Legal';

// Компонент будет доработан после утверждения окончательного дизайна

const AdditionalInfo = () => {
  const { comment, author, email, isCheckbox } = useSelector(
    (state) => state.form
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      comment,
      author,
      email,
      agreementCheckbox: isCheckbox,
    },
    mode: 'onSubmit',
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      saveAdditionalInfo({
        comment: data.comment,
        author: data.author,
        email: data.email,
      })
    );
    dispatch(postRecipe({ comment, author, email }));

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onError = (errorsObj) => {
    const types = getErrorTypes(errorsObj);

    if (types.includes('required')) {
      dispatch(addNotification('Заполните все обязательные поля'));
    }

    if (types.includes('minLength') || types.includes('pattern')) {
      dispatch(addNotification('Проверьте правильность заполнения полей'));
    }
  };

  const onGoBack = () => {
    dispatch(changeCurrentStage(3));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <section className={styles.additionalInfo}>
        <div className={styles.additionalInfo__comment}>
          <div className={styles.description}>
            <h3 className={styles.description__subtitle}>Примечание </h3>
            <p className={styles.description__text}>
              В этом поле вы можете написать дополнительную информацию о
              рецепте: как подавать блюдо, чем его можно украсить и с чем
              сочетать.
            </p>
          </div>
          <div
            className={`${styles.additionalInfo__textArea} ${
              errors.comment ? `${styles.additionalInfo__textArea_error}` : ''
            }`}
          >
            <textarea
              className={styles.additionalInfo__textAreaText}
              placeholder="Примечание"
              // name="add-info"
              // cols="30"
              // rows="10"

              maxLength="500"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('comment', {
                pattern: {
                  value:
                    /^[a-zA-Zа-яА-ЯёЁ0-9\s!@#$%^&№()_+\-=[\]{};':"\\|,.<>/?]+$/i,
                  message: `Используйте буквы, цифры и символы !-"№;%:?*()'/.,\\«»`,
                },
              })}
            />
            <span
              className={`${styles.additionalInfo__textAreaCounter} ${
                errors.comment
                  ? `${styles.additionalInfo__textAreaCounter_error}`
                  : ''
              }`}
            >
              {`${watch('comment')?.length || 0}/500`}
            </span>
          </div>
          {errors.comment && (
            <span className={styles.error}>
              {errors.comment?.message || ''}
            </span>
          )}
        </div>
        <div className={styles.description}>
          <h3 className={styles.description__subtitle}>Имя автора </h3>
          <p className={styles.description__text}> будет указано в рецепте</p>
          <input
            className={`${styles.description__input} ${
              errors.author ? `${styles.description__input_error}` : ''
            }`}
            type="text"
            placeholder="Ваше имя*"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('author', {
              required: true,
              pattern: {
                value: /^[А-Яа-яёЁA-Za-z0-9\s-_,.]+$/i,
                message: 'Используйте буквы, пробел и символы _ . - ,',
              },
              minLength: {
                value: 2,
                message: 'Введите не менее 2 символов',
              },
              maxLength: {
                value: 50,
                message: 'Максимальная длина 50 символов',
              },
            })}
          />
          {errors.author && (
            <span className={styles.error}>
              {errors.author.type === 'required'
                ? 'Поле обязательно к заполнению'
                : errors.author.message}
            </span>
          )}
        </div>
        <Legal register={register} errors={errors} />
      </section>
      <div className={styles.controls}>
        <Button
          btnClassName={buttons.withBorder.yellow}
          isSubmit={false}
          onClickBtn={onGoBack}
        >
          <img src={arrowLeft} alt="стрелка влево" /> назад
        </Button>
        <Button btnClassName={buttons.withBg.yellow} isSubmit>
          добавить рецепт
        </Button>
      </div>
    </form>
  );
};

export default AdditionalInfo;
