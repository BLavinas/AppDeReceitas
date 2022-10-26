import React, { useState, useCallback, useMemo } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [lsEmail, setLsEmail] = useState('');

  const [mealRecipe, setMealRecipe] = useState([]);
  const [drinkRecipe, setDrinkRecipe] = useState([]);

  // const history = useHistory();

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const LocalStoreClear = () => {
    localStorage.clear();
  };

  const GetEmailByLs = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setLsEmail(user.email);
  };

  const handleClick = useCallback(() => {
    localStorage.setItem('user', JSON.stringify({ email }));
    // TODO: retirei o history.push e substitui por um link no button.
  }, [email]);

  const contextLoginValue = useMemo(() => ({
    password,
    handlePassword,
    email,
    handleEmail,
    handleClick,
    LocalStoreClear,
    GetEmailByLs,
    lsEmail,
    mealRecipe,
    setMealRecipe,
    drinkRecipe,
    setDrinkRecipe,
  }), [email, password, handleClick, mealRecipe, drinkRecipe, lsEmail]);


  return (
    <LoginContext.Provider value={ contextLoginValue }>
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
