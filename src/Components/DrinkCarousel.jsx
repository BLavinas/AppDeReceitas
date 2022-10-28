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
    <div style={ { width: 300, heigth: 300 } }>
      <Carousel thumbWidth={ 300 } dynamicHeight={ 200 }>
        {dataDrinkApi?.map((recipe, index) => (
          <Carousel.Item data-testid={ `${index}-recommendation-card` } key={ index }>
            <h6 data-testid={ `${index}-recommendation-title` }>{recipe.strDrink}</h6>
            <img style={ {} } src={ recipe.strDrinkThumb } alt={ recipe.strDrink } />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
