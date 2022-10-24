import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // const [checkLogin, setCheckLogin] = useState(true);

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
    // const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    // if (emailRegex.test(`${email}`)) {
    //   setCheckLogin(false);
    // }
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
    // const passwordNumber = 6;
    // const validatePassword = password > passwordNumber;
    // if (validatePassword) {
    //   setCheckLogin(false);
    // }
  };

  const contextLoginValue = useMemo(() => ({
    password,
    handlePassword,
    email,
    handleEmail,
    // checkLogin,
  }), [email, password]);
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
