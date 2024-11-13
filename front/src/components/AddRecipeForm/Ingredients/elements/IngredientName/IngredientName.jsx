import { forwardRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import cn from 'classnames';
import styles from './IngredientName.module.scss';

import { API } from 'api/api';

const IngredientName = forwardRef(function IngredientName(props, ref) {
  const { isError, onChange, value, ...params } = props;

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const loadOptions = async (inpValue) => {
    if (!inpValue || inpValue.length < 3) return null;

    return await API.getIngredients(inpValue)
      .then(({ status, data }) => {
        if (status != 200) return null;

        return data.results.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      })
      .catch((error) => {
        console.log('getIngredients_ERROR: ', error);
        return null;
      })
      .finally(() => {
        setMenuIsOpen(true);
      });
  };

  return (
    <AsyncSelect
      {...params}
      ref={ref}
      cacheOptions
      unstyled
      menuIsOpen={menuIsOpen}
      loadOptions={loadOptions}
      isLoading={false}
      placeholder={'Название ингредиента'}
      value={currentValue}
      onChange={(data) => {
        setMenuIsOpen(false);
        setCurrentValue(data);
        onChange(data);
      }}
      onInputChange={(data) => {
        data?.length >= 3 ? setMenuIsOpen(true) : setMenuIsOpen(false);
      }}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      className="select-container"
      classNamePrefix="select"
      classNames={{
        control: () =>
          cn({
            [styles.error]: isError,
          }),
      }}
      loadingMessage={() => null}
      noOptionsMessage={() => (
        <p className={styles.notFound}>Нет такого ингредиента</p>
      )}
    />
  );
});

export default IngredientName;
