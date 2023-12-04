import { useState } from 'react';
import classnames from 'classnames';
import DropdownItem from 'components/UI/Dropdown/DropdownItem/DropdownItem';
import Input from 'components/UI/Input/Input';
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
  const optionsClasses = classnames(styles.options, {
    [styles.visible]: isDropdownOpen,
  });

  return (
    <div
      className={classnames(styles.dropdownSearch, styles[dropdownClassName])}
    >
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
      <ul className={optionsClasses} ref={selectItemRef}>
        {(() => {
          if (requiredData.length === 0) {
            return (
              <li className={classnames(styles.option, styles.option_notfound)}>
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
              key={item.id}
            />
          ));
        })()}
      </ul>
    </div>
  );
};

export default DropdownSearch;
