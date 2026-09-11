import './Account.css';
import Username from './Username/Username.jsx';
import Password from './Password/Password.jsx';
import Email from './Email/Email.jsx';
import { useState } from 'react';
import { Login } from '@/services/Authentication/Login.js';
import { Register } from '@/services/Authentication/Register.js';
import logo from '@/assets/H(1).png';

function Account({ token, setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [mode, setMode] = useState('login'); 

  // Authenticates user against API, sends JWT Token and saves to local storage
  const handleLogin = async (e) => {
      e.preventDefault();
      const data = await Login(username, password);
      localStorage.setItem('token', data.token);
      setToken(data.token);
  };

  // Adds user to database, sends JWT Token and saves to local storage
  const handleRegister = async (e) => {
      e.preventDefault();
      const data = await Register(username, email, password);
      localStorage.setItem('token', data.token);
      setToken(data.token);
  };
  
  return (
      <div className="account-page">

          <div className="account-logo">
              <img
                  className="account-logo-button"
                  src={logo}
              />
          </div>

          <div className="auth-toggle-buttons">
              <button
                  className="login-btn"
                  onClick={() => setMode('login')}
              >
                  Sign In
              </button>
              <button
                  className="register-btn"
                  onClick={() => setMode('register')}
              >
                  Sign Up
              </button>
          </div>

          {mode === 'login' ? (
              <form className="login-form" onSubmit={handleLogin}>
                  <h2>Login</h2>
                  <Username username={username} setUsername={setUsername} />
                  <Password password={password} setPassword={setPassword} />
                  <button type="submit" className="login-button">Login</button>
              </form>
          ) : (
              <form className="register-form" onSubmit={handleRegister}>
                  <h2>Register</h2>
                  <Username username={username} setUsername={setUsername} />
                  <Email email={email} setEmail={setEmail} />
                  <Password password={password} setPassword={setPassword} />
                  <button type="submit" className="register-button">Create Account</button>
              </form>
          )}

      </div>
  );
}

export default Account;