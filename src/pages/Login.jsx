import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../Context/LoginContext';

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
    <section>
      <form>
        <h2>Login</h2>

        <label htmlFor="email">
          Email:
          <input
            id="email"
            value={ email }
            onChange={ handleEmail }
            data-testid="email-input"
          />

          <label htmlFor="senha">
            Senha:
            <input
              id="senha"
              value={ password }
              onChange={ handlePassword }
              data-testid="password-input"
            />
          </label>

        </label>
        <Link to="/meals">
          <button
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
