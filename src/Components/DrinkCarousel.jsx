import React, { useState, useEffect } from 'react';

export default function MealCarousel() {
  const [dataDrinkApi, setDataDrinkApi] = useState([]);

  const requestDrinkApi = async () => {
    const randomNumber = 0.5;
    const maxNumber = 6;
    const drinkApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const responseDrinkApi = await drinkApi.json();
    const drinkRecipeResponse = responseDrinkApi?.drinks;
    const randomDrinks = drinkRecipeResponse?.sort(() => randomNumber - Math.random());
    const maxDrinks = randomDrinks?.slice(0, maxNumber);
    setDataDrinkApi(await maxDrinks);
  };

  useEffect(() => {
    requestDrinkApi();
  }, []);
  return (
    <div />
  );
}
