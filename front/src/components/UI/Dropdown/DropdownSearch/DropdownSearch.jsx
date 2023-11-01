import React, { useState } from 'react';
import Input from 'components/UI/Input/Input';
import DropdownItem from 'components/UI/Dropdown/DropdownItem/DropdownItem';
import { handleKeyboardNavigation } from 'helpers/useKeyboardNavigation';
import styles from './DropdownSearch.module.scss';

/**
 * Переиспользуемый компонент выпадающего меню для поиска.
 * Включает в себя импортируемый компонент Input, куда вводится запрос, выпадающий список результатов поиска и обработку ошибки "Не найдено".
 * Адаптация стилей и логики происходит через пропсы.
 * */

const DropdownSearch = (props) => {
  const {
    dropdownClassName,
    isDropdownOpen,
    setIsDropdownOpen,
    selectItemRef,
    inputClassName,
    isInputError,
    inputRegister,
    inputName,
    inputRequiredValue,
    inputRequiredMessage,
    inputPatternValue,
    inputPatternMessage,
    onInputChange,
    inputPlaceholder,
    inputValue,
    onChooseItem,
    requiredData,
    notFoundMessage,
    ariaLabelText,
  } = props;

  const [cursor, setCursor] = useState(-1);

  return (
    <div className={`${styles.dropdownSearch} ${styles[dropdownClassName]}}`}>
      <Input
        inputClassName={inputClassName}
        isError={isInputError}
        register={inputRegister}
        inputName={inputName}
        requiredValue={inputRequiredValue}
        requiredMessage={inputRequiredMessage}
        patternValue={inputPatternValue}
        patternMessage={inputPatternMessage}
        onChange={onInputChange}
        onKeyDown={(e) =>
          handleKeyboardNavigation(
            e,
            selectItemRef,
            isDropdownOpen,
            cursor,
            setCursor,
            requiredData,
            setIsDropdownOpen,
            onChooseItem
          )
        }
        placeholderText={inputPlaceholder}
        inputValue={inputValue}
      />
      <ul
        className={`${styles.dropdownSearch__options} ${
          isDropdownOpen && styles.dropdownSearch__options_visible
        }`}
        ref={selectItemRef}
      >
        {(() => {
          if (requiredData.length === 0) {
            return (
              <li
                className={`${styles.dropdownSearch__option} ${styles.dropdownSearch__option_notfound}`}
              >
                <div
                  style={{
                    width: '100%',
                  }}
                >
                  {notFoundMessage}
                </div>
              </li>
            );
          }
          return requiredData?.map((item, idx) => (
            <DropdownItem
              item={item}
              itemIndex={idx}
              cursor={cursor}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsDropdownOpen(false);
                }
              }}
              onClick={() => onChooseItem(item)}
              selectItemAriaLabelText={ariaLabelText}
            />
          ));
        })()}
      </ul>
    </div>
  );
};

export default DropdownSearch;
