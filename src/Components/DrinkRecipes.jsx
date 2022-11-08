import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginContext from '../Context/LoginContext';
import MealCarousel from './MealCarousel';
import StartRecipeBtn from './StartRecipeBtn';
// import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

import shareIcon from '../images/shareIcon.svg';
import '../style/drinkRecipes.css';

const copy = require('clipboard-copy');

export default function DrinkRecipes(props) {
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [ingredientsMeasure, setIngredientsMeasure] = useState([]);
  const { drinkRecipe, setDrinkRecipe } = useContext(LoginContext);
  const history = useHistory();

  // 41
  // const copy = require('clipboard-copy');
  const [linkCopied, setLinkCopied] = useState(false);
  const handleClick = async () => {
    const time = 1000;
    const copiar = history.location.pathname.split('/in-progress');
    console.log(copiar);
    copiar.toString(); // retornei o objeto do console logo como string
    await copy(`http://localhost:3000${copiar[0]}`);
    setLinkCopied(true);
    setInterval(() => setLinkCopied(false), time);
  };
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/ToString
  // https://blog.betrybe.com/javascript/javascript-split/
  // https://www.mundojs.com.br/2019/06/19/como-usar-o-setinterval/
  // 41

  // logica de desabilitar botão
  const [disable, setDisable] = React.useState(true);

  const checked = () => {
    const requi39 = document.querySelectorAll('input[type="checkbox"]:checked');
    if (requi39.length === ingredientsMeasure.length) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  // fim da logica de desabilitar botão

  useEffect(() => {
    const requestDrinkApi = async () => {
      const { props: { match: { params: { id } } } } = props;
      const drinkApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseDrinkApi = await drinkApi.json();
      const drinkRecipeResponse = responseDrinkApi.drinks[0];
      setDrinkRecipe(drinkRecipeResponse);
      const ingredientList = Object
        .entries(drinkRecipeResponse)
        .filter((ingredient) => ingredient[0]
          .includes('strIngredient')
          && ingredient[1]
          !== '' && ingredient[1]
          !== null).map((ingredient) => ingredient[1]);
      setDrinkIngredients(ingredientList);
      const measureIngredient = Object
        .entries(drinkRecipeResponse)
        .filter((measure) => measure[0]
          .includes('strMeasure')
          && measure[1]
          !== '' && measure[1] !== null && measure[1]).map((measure) => measure[1]);
      setIngredientsMeasure(measureIngredient);
    };
    requestDrinkApi();
  }, [setDrinkRecipe, props]);

  return (
    <div className="RecipesDrinks-container">
      <h1
        data-testid="recipe-title"
        className="RecipesDrinks-title"
      >
        {drinkRecipe.strDrink}
      </h1>
      <div className="RecipesDrinks-img">
        <img
          data-testid="recipe-photo"
          src={ drinkRecipe.strDrinkThumb }
          alt={ drinkRecipe.strDrink }
        />
      </div>
      <p data-testid="recipe-category">
        {drinkRecipe.strAlcoholic}
      </p>
      <form>
        {drinkIngredients.map((ingredient, index) => (
          <div
            key={ index[0] }
            data-testid={
              `${index}-ingredient-name-and-measure`
            }
          >
            <div
              data-testid={ `${index}-ingredient-step` }
            >

              <input
                type="checkbox"
                id={ index[0] }
                name={ index[0] }
                onClick={ () => checked() }
                className="risco"
              />
              <label
                key={ index[0] }
                htmlFor={ index[0] }
              >
                {`${ingredient} ${ingredientsMeasure[index]}`}
              </label>
            </div>
          </div>))}
        <div>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ disable }
          >
            Finish Recipe

          </button>
        </div>
      </form>
      <p data-testid="instructions">{drinkRecipe.strInstructions}</p>
      <div className="RecipesDrinks-button">
        <div>

          {linkCopied && <span>Link copied!</span>}
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => handleClick() }
          >
            <img
              src={ shareIcon }
              alt="share-button"
            />
          </button>
        </div>
        <FavoriteBtn drinkApi={ drinkRecipe } />
      </div>
      <section>
        <MealCarousel />
      </section>
      <div className="startRecipes-Drinks">
        <StartRecipeBtn />
      </div>
    </div>
  );
}

DrinkRecipes.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;
