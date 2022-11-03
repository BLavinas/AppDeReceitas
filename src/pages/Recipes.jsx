import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../component/Footer';
import InitialDrinksRecipes from '../component/InitialDrinksRecipes';
import InitialMealsRecipes from '../component/InitialMealsRecipes';
import Header from '../component/Header';

export default function Recipes() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const renderInitialRecipes = () => {
    if (pathname === '/meals') {
      return <InitialMealsRecipes />;
    }
    if (pathname === '/drinks') {
      return <InitialDrinksRecipes />;
    }
    // switch (pathname) {
    // case '/meals':
    //   return <InitialMealsRecipes />;
    // case '/drinks':
    //   return <InitialDrinksRecipes />;
    // default:
    //   return null;
    // }
  };
  return (
    <div>
      <Header />
      <title data-testid="page-title" title="Meals">Meals</title>
      <title data-testid="page-title" title="Drinks">Drinks</title>
      {/* <span>Recipes</span> */}
      {
        renderInitialRecipes()
      }
      <Footer />
    </div>
  );
}
