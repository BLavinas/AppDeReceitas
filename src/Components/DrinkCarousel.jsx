import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

export default function MealCarousel() {
  const [dataDrinkApi, setDataDrinkApi] = useState([]);

  const requestDrinkApi = async () => {
    // const randomNumber = 0.5;
    const maxNumber = 6;
    const drinkApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const responseDrinkApi = await drinkApi.json();
    const drinkRecipeResponse = responseDrinkApi?.drinks;
    // const randomDrinks = drinkRecipeResponse?.sort(() => randomNumber - Math.random());
    const maxDrinks = drinkRecipeResponse?.slice(0, maxNumber);
    setDataDrinkApi(await maxDrinks);
  };

  useEffect(() => {
    requestDrinkApi();
  }, []);
  return (
    <div style={ { width: '35vw', height: '35vw' } }>
      <Carousel style={ { width: '35vw', height: '35vw' } }>
        {dataDrinkApi?.map((recipe, index) => (
          <Carousel.Item
            style={ { width: '35vw', height: '35vw' } }
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <h6 data-testid={ `${index}-recommendation-title` }>{recipe.strDrink}</h6>
            <img
              style={ { width: '100%', height: '100%' } }
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
