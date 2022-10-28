import React, { useContext } from 'react';
import LoginContext from '../Context/LoginContext';

function InitialMealsRecipes() {
  const { initialMeals } = useContext(LoginContext);
  const numberMaxArray = 11;
  const arrayInitialMeals = initialMeals
    .filter((_item, index) => index <= numberMaxArray);
  const listMeals = arrayInitialMeals
    .map((meal) => {
      const formatMeals = Object.entries(meal);
      const filteredMeals = formatMeals
        .filter(([chave, value]) => chave && value && value !== '' && value !== ' ')
        .reduce((acc, [chave, value]) => {
          acc[chave] = value;
          return acc;
        }, {});
      return filteredMeals;
    });
  return (
    <div>
      {
        listMeals.map((meal, index) => (
          <section data-testid={ `${index}-recipe-card` } key={ meal.idMeal }>
            <h2 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h2>
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </section>
        ))
      }
    </div>
  );
}

export default InitialMealsRecipes;
