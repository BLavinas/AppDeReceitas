import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../Context/LoginContext';
import DrinkCarousel from './DrinkCarousel';

export default function MealRecipes(props) {
  const [mealIngredients, setMealIngredients] = useState([]);
  const [ingredientsMeasure, setIngredientsMeasure] = useState([]);
  const [youtubeId, setYoutubeId] = useState([]);
  const { setMealRecipe, mealRecipe } = useContext(LoginContext);

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
  }, []);
  return (
    <div>
      <h1 data-testid="recipe-title">{mealRecipe.strMeal}</h1>
      <img
        data-testid="recipe-photo"
        src={ mealRecipe.strMealThumb }
        alt={ mealRecipe.strMeal }
      />
      <p data-testid="recipe-category">{mealRecipe.strCategory}</p>
      {mealIngredients.map((ingredient, index) => (
        <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {`${ingredient} ${ingredientsMeasure[index]}`}
        </p>))}
      <p data-testid="instructions">
        {mealRecipe.strInstructions}
      </p>
      <iframe
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
      <section>
        <DrinkCarousel />
      </section>
    </div>
  );
}

MealRecipes.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;
