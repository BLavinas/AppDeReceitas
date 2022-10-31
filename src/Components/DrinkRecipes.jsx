import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../Context/LoginContext';
import MealCarousel from './MealCarousel';
import StartRecipeBtn from './StartRecipeBtn';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

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
  }, []);
  return (
    <div>
      <h1 data-testid="recipe-title">{drinkRecipe.strDrink}</h1>
      <img
        data-testid="recipe-photo"
        src={ drinkRecipe.strDrinkThumb }
        alt={ drinkRecipe.strDrink }
      />
      <p data-testid="recipe-category">
        {drinkRecipe.strAlcoholic}
      </p>
      {drinkIngredients.map((ingredient, index) => (
        <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {`${ingredient} ${ingredientsMeasure[index]}`}
        </p>))}
      <p data-testid="instructions">{drinkRecipe.strInstructions}</p>
      <ShareBtn />
      <FavoriteBtn />
      <section>
        <MealCarousel />
      </section>
      <div>
        <StartRecipeBtn />
      </div>
    </div>
  );
}

DrinkRecipes.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;
