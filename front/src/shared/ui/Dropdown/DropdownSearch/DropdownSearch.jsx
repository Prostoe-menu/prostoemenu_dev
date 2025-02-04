import { useState } from 'react';
import cn from 'classnames';
import { DropdownItem, Input, Loader } from 'ui';
import { handleKeyboardNavigation } from 'helpers/useKeyboardNavigation';
import useClickOutside from 'hooks/useClickOutside';
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

  const inputRef = useClickOutside(() => setIsDropdownOpen(false));

  const changeHandler = (event) => {
    const { value } = event.target;

    onInputChange(value);

    if (value.length > 2 && /^[a-zA-ZА-Яа-я]+$/.test(value)) {
      setIsDropdownOpen(true);
      return;
    }

    setIsDropdownOpen(false);

    if (value.length > 0 && !/^[a-zA-ZА-Яа-я]+$/.test(value)) {
      onInputChange('Используйте для ввода только буквы');
      setTimeout(() => {
        onInputChange(''); // Через 2 секунды возвращаем пустое значение инпута
      }, 2000);
    }
  };

  return (
    <div
      ref={inputRef}
      className={cn(styles.dropdownSearch, styles[dropdownClassName])}
    >
      <Input
        onChange={changeHandler}
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
        placeholder={inputPlaceholder}
        value={inputValue}
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
              setcursor={setCursor} // Добавили обработку курсора
              onKeyDown={(e) => {
                // Этот код не влияет на работу с esc
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
