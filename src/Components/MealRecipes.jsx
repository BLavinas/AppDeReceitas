import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../Context/LoginContext';
import DrinkCarousel from './DrinkCarousel';
import StartRecipeBtn from './StartRecipeBtn';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

import '../style/mealRecipes.css';

export default function MealRecipes(props) {
  const [mealIngredients, setMealIngredients] = useState([]);
  const [ingredientsMeasure, setIngredientsMeasure] = useState([]);
  const [youtubeId, setYoutubeId] = useState([]);
  const { setMealRecipe, mealRecipe } = useContext(LoginContext);

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
  // https://flexiple.com/javascript/disable-button-javascript/ Requisito 39

  useEffect(() => {
    const requestMealApi = async () => {
      const { props: { match: { params: { id } } } } = props;
      const mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseMealApi = await mealApi.json();
      const mealRecipeResponse = responseMealApi.meals[0];
      setMealRecipe(mealRecipeResponse);
      const ingredientList = Object
        .entries(mealRecipeResponse)
        .filter((ingredient) => ingredient[0]
          .includes('strIngredient')
          && ingredient[1]
          !== '' && ingredient[1]
          !== null).map((ingredient) => ingredient[1]);
      setMealIngredients(ingredientList);
      const measureIngredient = Object
        .entries(mealRecipeResponse)
        .filter((measure) => measure[0]
          .includes('strMeasure')
           && measure[1]
           !== '' && measure[1] !== null).map((measure) => measure[1]);
      setIngredientsMeasure(measureIngredient);
      const getYoutubeId = await mealRecipe?.strYoutube?.replace('https://www.youtube.com/watch?v=', '');
      setYoutubeId(getYoutubeId);
    };
    requestMealApi();
  }, [mealRecipe, props, setMealRecipe]);
  return (
    <div className="Recipes-container">
      <h1
        data-testid="recipe-title"
        className="Recipes-title"
      >
        {mealRecipe.strMeal}
      </h1>
      <img
        data-testid="recipe-photo"
        src={ mealRecipe.strMealThumb }
        alt={ mealRecipe.strMeal }
        className="RecipesMeals-img"
      />
      <p data-testid="recipe-category">{mealRecipe.strCategory}</p>
      {mealIngredients.map((ingredient, index) => (
        <div
          data-testid={
            `${index}-ingredient-name-and-measure ${index}-ingredient-step`
          }
          key={ index[0] }
        >
          <input
            id={ index[0] }
            type="checkbox"
            name={ index[0] }
            onClick={ () => checked() }
          />
          <label
            key={ index[0] }
            htmlFor={ index[0] }
          >
            {`${ingredient} ${ingredientsMeasure[index]}`}
          </label>
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
      <p data-testid="instructions">
        {mealRecipe.strInstructions}
      </p>
      <iframe
        className="Recipes-video"
        data-testid="video"
        width="853"
        height="480"
        src={ `https://www.youtube.com/embed/${youtubeId}` }
        frameBorder="0"
        allow="accelerometer;
         autoplay;
          clipboard-write;
          encrypted-media;
           gyroscope;
            picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
      <div className="Recipes-button">
        <ShareBtn />
        <FavoriteBtn mealApi={ mealRecipe } />
      </div>
      <section className="Recipes-carrosel">
        <DrinkCarousel />
      </section>
      <div className="startRecipes-meal">
        <StartRecipeBtn />
      </div>
    </div>
  );
}

MealRecipes.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;
