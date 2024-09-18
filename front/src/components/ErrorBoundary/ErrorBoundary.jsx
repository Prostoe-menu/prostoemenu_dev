import { useRouteError } from 'react-router-dom';
import styles from './ErrorBoundary.module.scss';

const ErrorBoundary = () => {
  let error = useRouteError();

  return (
    <div className={styles.container}>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = '/')}>
        Click here to reload the app
      </button>
    </div>
  );
};

export default ErrorBoundary;
