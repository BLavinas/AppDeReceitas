import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderDois from '../component/HeaderDois';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

import '../style/favoriteRecipes.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [linkCopied, setLinkCopied] = useState('');
  const [getFavoriteLocal, setGetFavoriteLocal] = useState([]);

  useEffect(() => {
    const favoriteLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setGetFavoriteLocal(favoriteLocal);
  }, []);

  const handleClipBoard = (type, id) => {
    copy(`${window.location.origin}/${type}s/${id}`);
    setLinkCopied(id);
  };

  const removeFavorite = (id) => {
    const filteredFavorite = getFavoriteLocal.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorite));
    setGetFavoriteLocal(filteredFavorite);
  };

  const handleFilter = ({ target: { name } }) => {
    const favoriteLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (name === 'meal') {
      const filterByMeal = favoriteLocal.filter((element) => element.type === 'meal');
      setGetFavoriteLocal(filterByMeal);
    } else if (name === 'drink') {
      const filterByDrink = favoriteLocal
        .filter((element) => element.type === 'drink');
      setGetFavoriteLocal(filterByDrink);
    } else {
      setGetFavoriteLocal(favoriteLocal);
    }
  };

  return (
    <div>
      <HeaderDois />
      <title data-testid="page-title" title="Favorite Recipes">Favorite Recipes</title>
      <div className="container-favoriteRecipes">
        <div className="filters-favoriteRecipes">
          <button
            onClick={ handleFilter }
            name="All"
            type="button"
            data-testid="filter-by-all-btn"
          >
            All

          </button>
          <button
            onClick={ handleFilter }
            name="meal"
            type="button"
            data-testid="filter-by-meal-btn"
          >
            Meals

          </button>
          <button
            onClick={ handleFilter }
            name="drink"
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks

          </button>
        </div>
        {getFavoriteLocal?.map((favoriteRecipe, index) => (
          <section
            key={ index }
            className="favoriteRecipe-section"
          >
            <Link to={ `/${favoriteRecipe.type}s/${favoriteRecipe.id}` }>
              <p
                data-testid={ `${index}-horizontal-name` }
                className="favoriteRecipes-name"
              >
                {favoriteRecipe.name}
              </p>
              <img
                className="favoriteRecipes-img"
                src={ favoriteRecipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ favoriteRecipe.name }
                width="150px"
              />
            </Link>
            <div className="favoriteRecipe-details">
              <div className="favoriteRecipe-descripiton">
                {favoriteRecipe.type === 'meal'
                  ? (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {`${favoriteRecipe.nationality} - ${favoriteRecipe.category}`}
                    </p>
                  )
                  : (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {favoriteRecipe.alcoholicOrNot}
                    </p>
                  )}
              </div>
              <div className="favoriteRecipes-buttons">
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeart }
                  onClick={ () => removeFavorite(favoriteRecipe.id) }
                >
                  <img src={ blackHeart } alt="unfavorite-button" />
                </button>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={
                    () => handleClipBoard(favoriteRecipe.type, favoriteRecipe.id)
                  }
                >
                  <img src={ shareIcon } alt="share-button" />
                </button>
                {linkCopied === favoriteRecipe.id && <span>Link copied!</span>}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;

// [{
//   id: id - da - receita,
//   type: meal - ou - drink,
//   nationality: nacionalidade - da - receita - ou - texto - vazio,
//   category: categoria - da - receita - ou - texto - vazio,
//   alcoholicOrNot: alcoholic - ou - non - alcoholic - ou - texto - vazio,
//   name: nome - da - receita,
//   image: imagem - da - receita
// }]
