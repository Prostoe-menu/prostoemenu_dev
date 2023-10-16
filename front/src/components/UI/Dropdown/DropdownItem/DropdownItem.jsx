import React from 'react';
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
}) => (
  <li className={styles.listItem} key={item.id}>
    <div
      className={`${styles.dropdownItem} ${
        itemIndex === cursor && styles.dropdownItem_active
      }`}
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

export default DropdownItem;
