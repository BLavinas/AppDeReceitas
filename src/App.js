import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import LoginProvider from './Context/LoginProvider';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import RecipeMeals from './pages/RecipeMeals';
import RecipeDrinks from './pages/RecipeDrinks';
import Profile from './pages/Profile';
import MealsInProgress from './pages/MealInProgress';
import DrinksInProgress from './pages/DrinkInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoritesRecipes';

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/meals/:id-da-receita" component={ RecipeMeals } />
          <Route path="/drinks/:id-da-receita" component={ RecipeDrinks } />
          <Route path="/meals/:id-da-receita/in-progress" component={ MealsInProgress } />
          <Route
            path="/drinks:id-da-receita/in-progress"
            component={ DrinksInProgress }
          />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
