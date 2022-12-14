import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../style/inicialDrinks.css';

function InitialDrinksRecipes() {
  const [initialDrinks, setInitialDrinks] = useState([]);
  const [categoryDrink, setCategoryDrink] = useState([]);
  const [newInititalDrink, setNewInitialDrink] = useState([]);
  const [selectedDrinkCategory, setSelectedDrinkCategory] = useState('');
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
    const fetchInitialDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const info = await response.json();
      console.log(info);
      setInitialDrinks(info.drinks);
      setNewInitialDrink(info.drinks);
    };
    fetchInitialDrinks();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategoryDrink(data.drinks);
    };
    fetchCategories();
  }, []);

  const fetchSelectedCategory = async (category) => {
    if (category !== selectedDrinkCategory) {
      setSelectedDrinkCategory(category);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setInitialDrinks(data.drinks);
    } else {
      setInitialDrinks(newInititalDrink);
    }
  };

  return (
    <div className="inicialdrinks-container">
      <section className="inicialdrinks-seletores">
        {/* <h2>Categorias</h2> */}
        {
          arrayCategoryDrink.map((category) => (
            <button
              type="button"
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => fetchSelectedCategory(category.strCategory) }
            >
              { category.strCategory }
            </button>
          ))
        }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setInitialDrinks(newInititalDrink) }
        >
          All
        </button>
      </section>
      <main className="main-content-drinks">
        {
          listDrinks.map((drink, index) => (
            <Link key={ drink.idDrink } to={ `/drinks/${drink.idDrink}` }>
              <section
                data-testid={ `${index}-recipe-card` }
                className="card-drinks"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <h2 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h2>
              </section>
            </Link>
          ))
        }
      </main>
    </div>
  );
}

export default InitialDrinksRecipes;
