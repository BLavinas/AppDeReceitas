import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderDois from '../component/HeaderDois';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  // const getDoneRecipesMock = [
  //   {
  //     id: '52771',
  //     type: 'meal',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //     doneDate: '23/06/2020',
  //     tags: ['Pasta', 'Curry'],
  //   },
  //   {
  //     id: '178319',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //     doneDate: '23/06/2020',
  //     tags: [],
  //   },
  // ];
  // localStorage.setItem('doneRecipes', JSON.stringify('getDoneRecipesMock'));
  const [getDoneRecipes, setGetDoneRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const getDoneRecipesLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    setGetDoneRecipes(getDoneRecipesLocal);
  }, []);

  const handleClipBoard = (type, id) => {
    copy(`${window.location.origin}/${type}s/${id}`);
    setLinkCopied(true);
  };

  const handleFilter = ({ target }) => {
    const getDoneRecipesLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (target.name === 'Meals') {
      const mealFilter = getDoneRecipesLocal
        .filter((doneRecipe) => doneRecipe.type === 'meal');
      setGetDoneRecipes(mealFilter);
    } else if (target.name === 'Drinks') {
      const drinkFilter = getDoneRecipesLocal
        .filter((doneRecipe) => doneRecipe.type === 'drink');
      setGetDoneRecipes(drinkFilter);
    } else {
      setGetDoneRecipes(getDoneRecipesLocal);
    }
  };

  return (
    <div>
      <HeaderDois />
      <title data-testid="page-title" title="Done Recipes">Done Recipes</title>
      <button
        name="All"
        onClick={ handleFilter }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All

      </button>
      <button
        name="Meals"
        type="button"
        onClick={ handleFilter }
        data-testid="filter-by-meal-btn"
      >
        Meals

      </button>
      <button
        name="Drinks"
        type="button"
        onClick={ handleFilter }
        data-testid="filter-by-drink-btn"
      >
        Drinks

      </button>
      {getDoneRecipes?.map((doneRecipe, index) => (
        <section key={ index }>
          <Link to={ `/${doneRecipe.type}s/${doneRecipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ doneRecipe.image }
              alt={ doneRecipe.name }
              width="300px"
            />
            <p data-testid={ `${index}-horizontal-name` }>{doneRecipe.name}</p>
          </Link>
          {doneRecipe.type === 'meal'
            ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${doneRecipe.nationality} - ${doneRecipe.category}`}
              </p>
            )
            : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {doneRecipe.alcoholicOrNot}
              </p>
            )}

          <p data-testid={ `${index}-horizontal-done-date` }>{doneRecipe.doneDate}</p>
          {doneRecipe.tags?.map((tag, i) => (
            <p
              key={ i }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))}
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => handleClipBoard(doneRecipe.type, doneRecipe.id) }
          >
            <img src={ shareIcon } alt="share-button" />
          </button>
          {linkCopied && <span>Link copied!</span>}
        </section>
      ))}
    </div>
  );
}

export default DoneRecipes;

// [{
//   id: id - da - receita,
//   type: meal - ou - drink,
//   nationality: nacionalidade - da - receita - ou - texto - vazio,
//   category: categoria - da - receita - ou - texto - vazio,
//   alcoholicOrNot: alcoholic - ou - non - alcoholic - ou - texto - vazio,
//   name: nome - da - receita,
//   image: imagem - da - receita,
//   doneDate: quando - a - receita - foi - concluida,
//   tags: array - de - tags - da - receita - ou - array - vazio
// }]
