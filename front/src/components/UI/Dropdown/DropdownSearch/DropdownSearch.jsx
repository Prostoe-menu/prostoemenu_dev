import React, { useState } from 'react';
import Input from '../../Input/Input';
import { handleKeyboardNavigation } from '../../../../helpers/useKeyboardNavigation';
import styles from './DropdownSearch.module.scss';

/**
 * Переиспользуемый компонент выпадающего меню для поиска.
 * Включает в себя импортируемый компонент Input, куда вводится запрос, выпадающий список результатов поиска и обработку ошибки "Не найдено".
 * Адаптация стилей и логики происходит через пропсы.
 * */

const DropdownSearch = ({
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
}) => {
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
        handleChangeInput={onInputChange}
        handleOnKeyDown={(e) =>
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
            <li className={styles.listItem} key={item.id}>
              <div
                className={`${styles.dropdownSearch__option} ${
                  idx === cursor && styles.dropdownSearch__option_active
                }`}
                onClick={() => onChooseItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsDropdownOpen(false);
                  }
                }}
                role="button"
                tabIndex="0"
                aria-label={ariaLabelText}
                style={{
                  width: '100%',
                }}
              >
                {item.name}
              </div>
            </li>
          ));
        })()}
      </ul>
    </div>
  );
};

export default DropdownSearch;
