import React, { useContext } from 'react';
import LoginContext from '../Context/LoginContext';

function Login() {
  const { password, email, handleEmail, handlePassword } = useContext(LoginContext);

  return (
    <section>
      <form>
        <h2>Login</h2>
        <label htmlFor="senha">
          Senha:
          <input
            id="senha"
            value={ password }
            onChange={ handlePassword }
            data-testid="password-input"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            id="email"
            value={ email }
            onChange={ handleEmail }
            data-testid="email-input"
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
        >
          Enter
        </button>
      </form>
    </section>
  );
}

export default Login;
