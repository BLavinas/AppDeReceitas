import React, { Component } from "react";

export default class Login extends Component {
  state = {
    email: "",
    senha: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, senha } = this.state;

    return (
      <section>
        <form onSubmit={ this.handleLogin }>
          <label>
            <h2>Login</h2>
            <input
              email={ email }
              handleChange={ this.handleChange }
            />
            <input
              handleChange={ this.handleChange }
            />
            <button
              data-testid="login-submit-btn"
            >
              Enter
            </button>
          </label>
        </form>
      </section>
    );
  }
}
