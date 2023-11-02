import React from 'react';
import classnames from 'classnames';
import styles from './DropdownItem.module.scss';

/**
 * Переиспользуемый компонент элемента выпадающего меню.
 * Адаптация стилей и логики происходит через пропсы.
 * */

const DropdownItem = ({
  item,
  itemIndex,
  cursor,
  onClick,
  onKeyDown,
  selectItemAriaLabelText,
}) => {
  const dropdownItemClass = classnames(styles.dropdownItem, {
    [styles.dropdownItem_active]: itemIndex === cursor,
  });

  return (
    <li className={styles.listItem} key={item.id}>
      <div
        className={dropdownItemClass}
        onClick={onClick}
        onKeyDown={onKeyDown}
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
