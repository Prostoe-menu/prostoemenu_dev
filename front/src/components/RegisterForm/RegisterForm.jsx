import { useState } from 'react';
import cn from 'classnames';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const [eye, setEye] = useState(true);
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);

  const handleShowLook = () => {
    setFocus(!focus);
  };
  const handleEye = () => setEye(!eye);

  const imgEyeStyle = eye
    ? cn(styles.image, styles.simple)
    : cn(styles.image, styles.close);

  const calcStyle = (num) => {
    let style;

    if (num <= 5) {
      style = { top: '14px', left: '4px' };
    } else if (num <= 10) {
      style = { top: '15px', left: '5.5px' };
    } else if (num <= 15) {
      style = { top: '16px', left: '7px' };
    } else if (num <= 20) {
      style = { top: '15px', left: '8.5px' };
    } else {
      style = { top: '14px', left: '10px' };
    }

    return style;
  };

  const pupilPosition = focus ? calcStyle(value.split('').length) : {};

  const leftEyeStyle = cn(styles.eye, styles.left);
  const rightEyeStyle = cn(styles.eye, styles.right);
  const pupilAddStyle = focus ? styles.lookDown : '';
  const pupilStyle = cn(styles.pupil, pupilAddStyle);

  return (
    <div className={styles.wrapper}>
      <div className={imgEyeStyle}>
        <>
          <div className={leftEyeStyle}>
            <div className={pupilStyle} style={pupilPosition} />
          </div>
          <div className={rightEyeStyle}>
            <div className={pupilStyle} style={pupilPosition} />
          </div>
        </>
      </div>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введите e-mail"
        onFocus={handleShowLook}
        onBlur={handleShowLook}
      />
      <input
        type="password"
        className={styles.input}
        onFocus={handleEye}
        onBlur={handleEye}
      />
      <div className={styles.button}>Зарегистрироваться</div>
    </div>
  );
};

export default RegisterForm;
