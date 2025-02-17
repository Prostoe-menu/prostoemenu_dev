import { useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import AsyncSelect from 'react-select/async';
import cn from 'classnames';
import { API } from 'api/api';
import { IIngredient } from 'shared/types/ingredients';
import styles from './IngredientName.module.scss';

type TIngredientNameProps = {
  isError: boolean;
  onChange: (value: string) => void;
  value: string | null;
};

const IngredientName = ({ isError, onChange, value }: TIngredientNameProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const loadOptions = async (inpValue: string) => {
    if (!inpValue || inpValue.length < 3) return [];

    try {
      const { status, data } = await API.getIngredients(inpValue);
      if (status !== 200) return [];

      return data.results.map((item: IIngredient) => ({
        value: item.id,
        label: item.name,
      })) as unknown as OptionsOrGroups<string, GroupBase<string>>;
    } catch (error) {
      console.log('getIngredients_ERROR: ', error);
      return [];
    } finally {
      setMenuIsOpen(true);
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      unstyled
      menuIsOpen={menuIsOpen}
      loadOptions={loadOptions}
      isLoading={false}
      placeholder={'Название ингредиента'}
      value={currentValue}
      onChange={(data) => {
        if (data) {
          setMenuIsOpen(false);
          setCurrentValue(data);
          onChange(data);
        }
      }}
      onInputChange={(data) => {
        if (data?.length >= 3) setMenuIsOpen(true);
        else setMenuIsOpen(false);
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
};

export default IngredientName;
