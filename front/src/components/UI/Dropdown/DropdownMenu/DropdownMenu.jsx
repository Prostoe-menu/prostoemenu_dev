import { useState } from 'react';
import classnames from 'classnames';
import { v4 as uuidV4 } from 'uuid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DropdownItem from 'components/UI/Dropdown/DropdownItem/DropdownItem';
import { handleKeyboardNavigation } from 'helpers/useKeyboardNavigation';
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
  const optionsClasses = classnames(styles.options, {
    [styles.visible]: isDropdownOpen,
  });

  const toggleDropdown = () => setIsDropdownOpen((prevValue) => !prevValue);
  const handleKeyDown = (e) =>
    handleKeyboardNavigation(
      e,
      selectItemInputRef,
      isDropdownOpen,
      cursor,
      setCursor,
      dropdownData,
      setIsDropdownOpen,
      chooseItem
    );

  return (
    <div className={classnames(styles.dropdownMenu, styles[dropdownClassName])}>
      <div
        className={styles.input}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
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
      <ul className={optionsClasses} ref={selectItemInputRef}>
        {dropdownData?.map((item, idx) => (
          <DropdownItem
            item={item}
            itemIndex={idx}
            cursor={cursor}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsDropdownOpen(false);
              }
            }}
            onClick={() => chooseItem(item)}
            selectItemAriaLabelText={chooseItemAriaLabelText}
            key={uuidV4()}
          />
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
