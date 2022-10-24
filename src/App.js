import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './Context/LoginProvider';
import Login from './pages/Login';

function App() {
  return (
    <LoginProvider>
      <Login />
    </LoginProvider>
  );
}

export default App;
