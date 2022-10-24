import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginProvider from './Context/LoginProvider';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
      </Switch>
    </LoginProvider>
  );
}

export default App;
