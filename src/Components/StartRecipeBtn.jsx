import React from 'react';
import { useHistory, Link } from 'react-router-dom';

export default function StartRecipeBtn() {
  const getLocalInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
  ?? { meals: {}, drinks: {} };
  const history = useHistory();
  const { location: { pathname } } = history;
  const pathSplit = pathname.split('/');
  const id = pathSplit[2];
  const drinkOrMeal = pathSplit[1];
  const inProgressKeys = Object.keys(getLocalInProgress[drinkOrMeal]);

  // const handleClick = () => {
  //   history.push(`${pathname}/in-progress`);
  // };

  const checkBtn = () => {
    if (getLocalInProgress[drinkOrMeal] !== null
      && inProgressKeys.includes(id)
    ) {
      return (
        <Link to={ `${pathname}/in-progress` }>
          <button
            style={ { position: 'fixed', bottom: '0px' } }
            type="button"
            data-testid="start-recipe-btn"
          // onClick={ handleClick }
          >
            Continue Recipe
          </button>
        </Link>

      );
    }
    return (
      <Link to={ `${pathname}/in-progress` }>
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
          type="button"
        // onClick={ handleClick }
        >
          Start Recipe

        </button>
      </Link>
    );
  };

  return (
    <div>
      {checkBtn()}
    </div>
  );
}
