import React, { useContext, useState, useEffect } from 'react';
import LoginContext from '../Context/LoginContext';

function InitialMealsRecipes() {
  const { initialMeals } = useContext(LoginContext);
  const [categoryMeal, setCategoryMeal] = useState([]);
  const numberMaxArray = 11;
  const numberMaxCategory = 4;

  const arrayCategoryMeal = categoryMeal
    .filter((_item, index) => index <= numberMaxCategory);

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

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategoryMeal(data.meals);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categorias</h2>
      {
        arrayCategoryMeal.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }
          </button>
        ))
      }
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
