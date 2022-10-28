import React, { useContext, useState, useEffect } from 'react';
import LoginContext from '../Context/LoginContext';

function InitialDrinksRecipes() {
  const { initialDrinks } = useContext(LoginContext);
  const [categoryDrink, setCategoryDrink] = useState([]);
  const numberMaxArray = 11;
  const numberMaxCategory = 4;

  const arrayInitialDrinks = initialDrinks
    .filter((_item, index) => index <= numberMaxArray);

  const arrayCategoryDrink = categoryDrink
    .filter((_item, index) => index <= numberMaxCategory);

  const listDrinks = arrayInitialDrinks
    .map((drink) => {
      const formatDrink = Object.entries(drink);
      const filteredDrink = formatDrink
        .filter(([chave, value]) => chave && value && value !== '' && value !== ' ')
        .reduce((acc, [chave, value]) => {
          acc[chave] = value;
          return acc;
        }, {});
      return filteredDrink;
    });

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategoryDrink(data.drinks);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categorias</h2>
      {
        arrayCategoryDrink.map((category) => (
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
        listDrinks.map((drink, index) => (
          <section data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
            <h3 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
          </section>
        ))
      }
    </div>
  );
}

export default InitialDrinksRecipes;
