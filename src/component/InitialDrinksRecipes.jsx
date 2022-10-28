import React, { useContext } from 'react';
import LoginContext from '../Context/LoginContext';

function InitialDrinksRecipes() {
  const { initialDrinks } = useContext(LoginContext);
  const numberMaxArray = 11;
  const arrayInitialDrinks = initialDrinks
    .filter((_item, index) => index <= numberMaxArray);
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

  return (
    <div>
      {
        listDrinks.map((drink, index) => (
          <section data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
            <h2 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h2>
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
