import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

export default function DrinkCarousel() {
  const [dataMealApi, setDataMealApi] = useState([]);
  const requestMealApi = async () => {
    // const randomNumber = 0.5;
    const maxDrinks = 6;
    const mealApi = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const responseMealApi = await mealApi.json();
    const mealRecipeResponse = responseMealApi.meals;
    // const randomMeals = mealRecipeResponse?.sort(() => randomNumber - Math.random());
    const maxMeals = mealRecipeResponse?.slice(0, maxDrinks);
    console.log(maxMeals);
    setDataMealApi(maxMeals);
  };

  useEffect(() => {
    requestMealApi();
  }, []);
  return (
    <div style={ { width: '35vw', height: '35vw' } }>
      <Carousel style={ { width: '35vw', height: '35vw' } }>
        {dataMealApi?.map((recipe, index) => (
          <Carousel.Item
            style={ { width: '35vw', height: '35vw' } }
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <h6 data-testid={ `${index}-recommendation-title` }>{recipe.strMeal}</h6>
            <img
              style={ { width: '100%', height: '100%' } }
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
