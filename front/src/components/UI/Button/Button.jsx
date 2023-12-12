import classnames from 'classnames';
import styles from './Button.module.scss';

/**
 * Компонент кнопки (с иконкой и без).
 * Адаптация стилей и логики происходит через пропсы. Содержимое кнопки передается через пропс children.
 * По умолчанию имеет type 'button'.
 * */

const Button = ({
  view = 'primary',
  iconPosition = 'left',
  className,
  type = 'button',
  children,
  ...props
}) => {
  const btnClasses = classnames(
    styles.button,
    styles[`view-${view}`],
    {
      [styles.reverse]: iconPosition === 'right',
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
