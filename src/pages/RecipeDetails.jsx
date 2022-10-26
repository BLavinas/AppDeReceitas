import React from 'react';
import { useHistory } from 'react-router-dom';
import DrinkRecipes from '../Components/DrinkRecipes';
import MealRecipes from '../Components/MealRecipes';

export default function RecipeDetails(props) {
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <div>
      {
        pathname.includes('meals')
          ? <MealRecipes props={ props } />
          : <DrinkRecipes props={ props } />
      }

    </div>
  );
}
