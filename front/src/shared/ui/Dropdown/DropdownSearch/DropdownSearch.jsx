import { useState } from 'react';
import cn from 'classnames';
import { DropdownItem, Input, Loader } from 'ui';
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
    isLoading,
  } = props;

  const [cursor, setCursor] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={cn(styles.dropdownSearch, styles[dropdownClassName])}>
      <Input
        inputClassName={inputClassName}
        isError={isInputError}
        register={inputRegister}
        inputName={inputName}
        requiredValue={inputRequiredValue}
        requiredMessage={inputRequiredMessage}
        patternValue={inputPatternValue}
        patternMessage={inputPatternMessage}
        onChange={(event) => {
          onInputChange(event);

          if (inputValue.length >= 2) {
            setTimeout(() => {
              setIsDropdownOpen(true);
            }, 1100);
          } else {
            setIsDropdownOpen(false);
          }
        }}
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
        className={cn(styles.options, {
          [styles.visible]: isDropdownOpen,
        })}
        ref={selectItemRef}
      >
        {isLoading && <Loader size="small" />}

        {(!requiredData || !requiredData.length) && !isLoading && (
          <li className={cn(styles.option, styles.option_notfound)}>
            {notFoundMessage}
          </li>
        )}

        {!isLoading &&
          requiredData?.length > 0 &&
          requiredData?.map((item, idx) => (
            <DropdownItem
              item={item}
              itemIndex={idx}
              cursor={cursor}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsDropdownOpen(false);
                }
              }}
              onClick={() => {
                setIsDropdownOpen(false);
                onChooseItem(item);
              }}
              selectItemAriaLabelText={ariaLabelText}
              key={item.id}
            />
          ))}
      </ul>
    </div>
  );
};

export default DropdownSearch;
