import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { handleKeyboardNavigation } from '../../../../helpers/useKeyboardNavigation';
import styles from './DropdownMenu.module.scss';

/**
 * Переиспользуемый компонент выпадающего меню.
 * Адаптация стилей и логики происходит через пропсы.
 * */

const DropdownMenu = ({
  dropdownClassName,
  isDropdownOpen,
  setIsDropdownOpen,
  openDropdownAriaLabelText,
  previewText,
  selectItemInputRef,
  dropdownData,
  chooseItem,
  chooseItemAriaLabelText,
}) => {
  const [cursor, setCursor] = useState(-1);

  return (
    <div className={`${styles.dropdownMenu} ${styles[dropdownClassName]}}`}>
      <div
        className={styles.input}
        onClick={() => setIsDropdownOpen((prevValue) => !prevValue)}
        onKeyDown={(e) =>
          handleKeyboardNavigation(
            e,
            selectItemInputRef,
            isDropdownOpen,
            cursor,
            setCursor,
            dropdownData,
            setIsDropdownOpen,
            chooseItem
          )
        }
        role="button"
        tabIndex="0"
        aria-label={openDropdownAriaLabelText}
      >
        <span>{previewText}</span>
        <ExpandMoreIcon
          styles={{
            color: '#818181',
            stroke: '#ffffff',
            strokeWidth: 1,
          }}
        />
      </div>
      <ul
        className={`${styles.dropdownMenu__options} ${
          isDropdownOpen && styles.dropdownMenu__options_visible
        }`}
        ref={selectItemInputRef}
      >
        {dropdownData?.map((item, idx) => (
          <li className={styles.listItem} key={item.id}>
            <div
              className={`${styles.dropdownMenu__option} ${
                idx === cursor && styles.dropdownMenu__option_active
              }`}
              key={item.id}
              onClick={() => chooseItem(item)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsDropdownOpen(false);
                }
              }}
              role="button"
              tabIndex="0"
              aria-label={chooseItemAriaLabelText}
              style={{
                width: '100%',
              }}
            >
              {item.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
