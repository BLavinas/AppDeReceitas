import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export default function FavoriteBtn(props) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { mealApi, drinkApi } = props;

  const history = useHistory();
  const { location: { pathname } } = history;

  const verifyIsFavorited = () => {
    const getFavoriteLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const splitPath = pathname.split('/');
    const recipeId = splitPath[2];
    if (getFavoriteLocal?.some((element) => element.id === recipeId)) {
      setIsFavorited(true);
    }
  };

  const removeFavorite = () => {
    const getFavoriteLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const splitPath = pathname.split('/');
    const recipeId = splitPath[2];
    const filteredFavorite = getFavoriteLocal
      .filter((element) => element.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorite));
    setIsFavorited(false);
  };

  useEffect(() => {
    verifyIsFavorited();
  }, []);

  const addFavorite = () => {
    const getFavoriteLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (pathname.includes('meals')) {
      const favoriteMeal = [{
        id: mealApi?.idMeal,
        type: 'meal',
        nationality: mealApi?.strArea,
        category: mealApi?.strCategory,
        alcoholicOrNot: '',
        name: mealApi?.strMeal,
        image: mealApi?.strMealThumb,
      }];
      if (getFavoriteLocal === null) {
        localStorage
          .setItem('favoriteRecipes', JSON.stringify(favoriteMeal));
        setIsFavorited(true);
      } else {
        localStorage
          .setItem('favoriteRecipes', JSON
            .stringify([...getFavoriteLocal, ...favoriteMeal]));
        setIsFavorited(true);
      }
    } else {
      const favoriteDrink = [{
        id: drinkApi?.idDrink,
        type: 'drink',
        nationality: '',
        category: drinkApi?.strCategory,
        alcoholicOrNot: drinkApi?.strAlcoholic,
        name: drinkApi?.strDrink,
        image: drinkApi?.strDrinkThumb,
      }];
      if (getFavoriteLocal === null) {
        localStorage
          .setItem('favoriteRecipes', JSON.stringify(favoriteDrink));
        setIsFavorited(true);
      } else {
        localStorage
          .setItem('favoriteRecipes', JSON
            .stringify([...getFavoriteLocal, ...favoriteDrink]));
        setIsFavorited(true);
      }
    }
  };
  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ isFavorited === true ? removeFavorite : addFavorite }
        src={ isFavorited === true ? blackHeart : whiteHeart }
      >
        {isFavorited === true
          ? <img src={ blackHeart } alt="favorited" />
          : <img src={ whiteHeart } alt="not-favorited" />}

      </button>
    </div>
  );
}

FavoriteBtn.propTypes = {
  drinkApi: PropTypes.shape({
    idDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  mealApi: PropTypes.shape({
    idMeal: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};
