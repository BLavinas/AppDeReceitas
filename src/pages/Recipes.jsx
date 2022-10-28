import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../component/Footer';
import InitialDrinksRecipes from '../component/InitialDrinksRecipes';
import InitialMealsRecipes from '../component/InitialMealsRecipes';

export default function Recipes() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const renderInitialRecipes = () => {
    switch (pathname) {
    case '/meals':
      return <InitialMealsRecipes />;
    case '/drinks':
      return <InitialDrinksRecipes />;
    default:
      return null;
    }
  };
  return (
    <div>
      <span>Recipes</span>
      {
        renderInitialRecipes()
      }
      <Footer />
    </div>
  );
}
