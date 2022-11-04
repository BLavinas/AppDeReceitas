import React, { useState } from 'react';
import HeaderDois from '../component/HeaderDois';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const getDoneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  // const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [linkCopied, setLinkCopied] = useState(false);

  const handleClick = (type, id) => {
    copy(`${window.location.origin}/${type}s/${id}`);
    setLinkCopied(true);
  };

  return (
    <div>
      <HeaderDois />
      <title data-testid="page-title" title="Done Recipes">Done Recipes</title>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {getDoneRecipes?.map((doneRecipe, index) => (
        <section key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ doneRecipe.image }
            alt={ doneRecipe.name }
          />
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

          <p data-testid={ `${index}-horizontal-name` }>{doneRecipe.name}</p>
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
            onClick={ () => handleClick(doneRecipe.type, doneRecipe.id) }
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
