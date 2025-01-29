import cn from 'classnames';
import styles from './DropdownItem.module.scss';

/**
 * Переиспользуемый компонент элемента выпадающего меню.
 * Адаптация стилей и логики происходит через пропсы.
 * */

const DropdownItem = ({
  item,
  itemIndex,
  cursor,
  setcursor,
  onClick,
  onKeyDown,
  selectItemAriaLabelText,
}) => {
  const dropdownItemClass = cn(styles.dropdownItem, {
    [styles.dropdownItem_active]: itemIndex === cursor,
  });

  const handleOnMouseEnter = () => {
    // Устанавливаем курсор на текущий элемент при наведении мыши
    setcursor(itemIndex);
  };

  return (
    <li className={styles.listItem} key={item.id}>
      <div
        className={dropdownItemClass}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={handleOnMouseEnter} // Добавили отслеживание наведения мыши
        role="button"
        tabIndex="0"
        aria-label={selectItemAriaLabelText}
        style={{
          width: '100%',
        }}
      >
        {item.name}
      </div>
    </li>
  );
};

export default DropdownItem;
