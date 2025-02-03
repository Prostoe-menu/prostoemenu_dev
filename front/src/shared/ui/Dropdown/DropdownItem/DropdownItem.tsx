import cn from 'classnames';
import styles from './DropdownItem.module.scss';

/**
 * Переиспользуемый компонент элемента выпадающего меню.
 * Адаптация стилей и логики происходит через пропсы.
 * */

type TDropdownItemProps<T> = {
  item: T;
  itemIndex: number;
  cursor: number;
  selectItemAriaLabelText: string;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  setcursor?: (index: number) => void;
};

const DropdownItem = <T extends { id: string; name: string }>({
  item,
  itemIndex,
  cursor,
  setcursor,
  onClick,
  onKeyDown,
  selectItemAriaLabelText,
}: TDropdownItemProps<T>) => {
  const dropdownItemClass = cn(styles.dropdownItem, {
    [styles.dropdownItem_active]: itemIndex === cursor,
  });

  const handleOnMouseEnter = () => {
    // Устанавливаем курсор на текущий элемент при наведении мыши
    setcursor && setcursor(itemIndex);
  };

  return (
    <li className={styles.listItem} key={item.id}>
      <div
        className={dropdownItemClass}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={handleOnMouseEnter} // Добавили отслеживание наведения мыши
        role="button"
        tabIndex={0}
        aria-label={selectItemAriaLabelText}
      >
        {item.name}
      </div>
    </li>
  );
};

export default DropdownItem;
