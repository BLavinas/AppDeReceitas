import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../Context/LoginContext';
import MealCarousel from './MealCarousel';
import StartRecipeBtn from './StartRecipeBtn';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

import '../style/drinkRecipes.css';

export default function DrinkRecipes(props) {
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [ingredientsMeasure, setIngredientsMeasure] = useState([]);
  const { drinkRecipe, setDrinkRecipe } = useContext(LoginContext);

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
      {drinkIngredients.map((ingredient, index) => (
        <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {`${ingredient} ${ingredientsMeasure[index]}`}
        </p>))}
      <p data-testid="instructions">{drinkRecipe.strInstructions}</p>
      <div className="RecipesDrinks-button">
        <ShareBtn />
        <FavoriteBtn drinkApi={ drinkRecipe } />
      </div>
      <section>
        <MealCarousel />
      </section>
      <div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finish Recipe

        </button>
        ;
      <div className="startRecipes-Drinks">
        <StartRecipeBtn />
      </div>
    </div>
  );
}

DrinkRecipes.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;
