import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../Context/LoginContext';

import '../style/login-page.css';

function Login() {
  const {
    password,
    email,
    handleEmail,
    handlePassword,
    handleClick,
  } = useContext(LoginContext);
  const passwordNumber = 6;
  const validateEmail = /\S+@\S+\.\S+/i.test(email);
  const validatePassword = password.length > passwordNumber;

  return (
    <section className="formulario">
      <form>
        <h2>Login</h2>

        <label htmlFor="email">
          <input
            id="email"
            value={ email }
            onChange={ handleEmail }
            data-testid="email-input"
            placeholder="Email:"
          />

          <label htmlFor="senha">
            <input
              id="senha"
              type="password"
              value={ password }
              onChange={ handlePassword }
              data-testid="password-input"
              placeholder="Senha:"
            />
          </label>

        </label>
        <Link to="/meals">
          <button
            className="botao-form"
            data-testid="login-submit-btn"
            type="button"
            disabled={ !(validateEmail && validatePassword) }
            onClick={ handleClick }
          >
            Enter
          </button>
        </Link>
      </form>
    </section>
  );
}

export default Login;
