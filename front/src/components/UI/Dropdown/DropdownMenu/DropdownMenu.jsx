import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './DropdownMenu.module.scss';

const DropdownMenu = ({
  dropdownClassName,
  setIsDropdownOpen,
  onInputKeyDown,
  openDropdownAriaLabelText,
  previewText,
  isDropdownOpen,
  selectItemInputRef,
  dropdownData,
  cursor,
  chooseItem,
  chooseItemAriaLabelText,
}) => (
  <div className={`${styles.dropdownMenu} ${styles[dropdownClassName]}}`}>
    <div
      className={styles.input}
      onClick={() => setIsDropdownOpen((prevValue) => !prevValue)}
      onKeyDown={onInputKeyDown}
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
            onClick={() => chooseItem(item.unitName)}
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
            {item.unitName}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default DropdownMenu;
