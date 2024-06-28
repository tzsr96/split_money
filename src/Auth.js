import React, { useState } from 'react';
import axios from 'axios';
import './assets/Auth.css';

function Auth({ onAuth }) {
  
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// In your handleAuth function:
const handleAuth = async (e) => {
  e.preventDefault();
  const endpoint = isLogin ? '/login' : '/register';
  try {
    const response = await api.post(endpoint, { username, password });
    console.log(response);
    if (isLogin) {
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      onAuth(token);
    } else {
      setMessage(response.data);
    }
  } catch (error) {
    console.error(error);
    setMessage(error.response ? error.response.data : 'An error occurred');
  }
};

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        <form onSubmit={handleAuth}>
          <div className="form-groups">
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
          </div>
          <div className="form-groups">
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
          </div>
          <div className="button-row">
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need to register?' : 'Have an account? Login'}
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Auth;
