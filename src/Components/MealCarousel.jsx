import React, { useEffect, useState } from 'react';

export default function DrinkCarousel() {
  const [dataMealApi, setDataMealApi] = useState({});
  const requestMealApi = async () => {
    const randomNumber = 0.5;
    const maxNumber = 6;
    const mealApi = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const responseMealApi = await mealApi.json();
    const mealRecipeResponse = responseMealApi.meals;
    const randomMeals = mealRecipeResponse?.sort(() => randomNumber - Math.random());
    const maxMeals = randomMeals?.slice(0, maxNumber);
    setDataMealApi(maxMeals);
  };

  useEffect(() => {
    requestMealApi();
  }, []);
  return (
    <div>DrinkCarousel</div>
  );
}
