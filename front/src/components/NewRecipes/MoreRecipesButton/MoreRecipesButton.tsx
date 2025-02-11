import { MouseEvent, useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { fetchMoreRecipes } from 'store/slices/recipe/recipeThunk';
import Button from 'ui/Button';
import Loader from 'ui/Loader';
import styles from './MoreRecipesButton.module.scss';

type TMoreRecipesButtonProps = {
  moreUrl: string;
};

export const MoreRecipesButton = ({ moreUrl }: TMoreRecipesButtonProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const clickHandler = (event: MouseEvent) => {
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
