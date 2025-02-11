import { ChangeEvent, forwardRef, useState } from 'react';
import Input from 'ui/Input';
import { isNumber } from 'helpers/utils';
import { MAX_VOLUME_LENGTH } from 'utils/constants';
import styles from './VolumeInput.module.scss';

type TVolumeInputProps = {
  isError?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};
const VolumeInput = forwardRef<HTMLInputElement, TVolumeInputProps>(
  function VolumeInput({ isError, onChange, value, ...props }, ref) {
    const [inputValue, setInputValue] = useState(value || '');

    const changeVolumeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (isNumber(value)) {
        onChange(event);
        setInputValue(value);
      }
    };

    return (
      <Input
        {...props}
        ref={ref}
        isError={isError}
        autoFocus={false}
        min={0}
        step={'0.100'}
        size={MAX_VOLUME_LENGTH}
        maxLength={MAX_VOLUME_LENGTH}
        className={styles.volume}
        value={inputValue}
        onChange={changeVolumeHandler}
      />
    );
  }
);

export default VolumeInput;
