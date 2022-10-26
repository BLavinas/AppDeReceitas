import React, { useState, useCallback, useMemo } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // const history = useHistory();

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
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
  }), [email, password, handleClick]);

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
