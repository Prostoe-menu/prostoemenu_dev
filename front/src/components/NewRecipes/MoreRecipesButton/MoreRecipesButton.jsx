import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMoreRecipes } from 'store/slices/recipe/recipeThunk';
import Button from 'ui/Button';
import Loader from 'ui/Loader';
import styles from './MoreRecipesButton.module.scss';

export const MoreRecipesButton = ({ moreUrl }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const clickHandler = (event) => {
    event.preventDefault();

    setLoading(true);
    dispatch(fetchMoreRecipes(moreUrl));

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  if (loading) return <Loader />;

  return (
    <Button
      view="secondary"
      className={styles.moreBtn}
      onClick={clickHandler}
      disabled={!moreUrl}
    >
      Показать еще
    </Button>
  );
};

export default MoreRecipesButton;
