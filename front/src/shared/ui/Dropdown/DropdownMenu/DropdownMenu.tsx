import { KeyboardEvent, RefObject, useState } from 'react';
import cn from 'classnames';
import { DropdownItem } from 'ui/Dropdown';
import { handleKeyboardNavigation } from 'helpers/useKeyboardNavigation';
import ArrowDown from 'assets/images/arrow-down.svg?react';
import styles from './DropdownMenu.module.scss';

/**
 * Переиспользуемый компонент выпадающего меню.
 * Адаптация стилей и логики происходит через пропсы.
 * */

type TDropdownMenuProps<T> = {
  dropdownClassName: string;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openDropdownAriaLabelText: string;
  previewText: string;
  selectItemInputRef: RefObject<HTMLUListElement>;
  dropdownData: Array<T>;
  chooseItem: (item: T) => void;
  chooseItemAriaLabelText: string;
};

const DropdownMenu = <T extends { id: string; name: string }>({
  dropdownClassName,
  isDropdownOpen,
  setIsDropdownOpen,
  openDropdownAriaLabelText,
  previewText,
  selectItemInputRef,
  dropdownData,
  chooseItem,
  chooseItemAriaLabelText,
}: TDropdownMenuProps<T>) => {
  const [cursor, setCursor] = useState(-1);
  const optionsClasses = cn(styles.options, {
    [styles.visible]: isDropdownOpen,
  });

  const toggleDropdown = () => setIsDropdownOpen((prevValue) => !prevValue);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
    handleKeyboardNavigation<T>(
      e,
      selectItemInputRef,
      dropdownData,
      cursor,
      setCursor,
      isDropdownOpen,
      setIsDropdownOpen,
      chooseItem
    );

  return (
    <div className={cn(styles.dropdownMenu, styles[dropdownClassName])}>
      <div
        className={styles.input}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={openDropdownAriaLabelText}
      >
        <span>{previewText}</span>
        <ArrowDown />
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
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
