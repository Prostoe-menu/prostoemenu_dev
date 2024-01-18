import classnames from 'classnames';
import styles from './Button.module.scss';

/**
 * Компонент кнопки (с иконкой и без).
 * Адаптация стилей и логики происходит через пропсы. Содержимое кнопки передается через пропс children.
 * По умолчанию имеет type 'button'.
 * Имеет следующие стили: primary, secondary, tertiary, cross (для кнопок удаления или закрытия компонента).
 * */

const Button = ({
  view = 'primary',
  iconPosition = 'right',
  isHidden = false,
  className,
  type = 'button',
  children,
  ...props
}) => {
  const btnClasses = classnames(
    styles.button,
    styles[`view-${view}`],
    {
      [styles.reverse]: iconPosition === 'left',
      [styles.hidden]: isHidden,
    },
    className
  );

  return (
    <button className={btnClasses} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
