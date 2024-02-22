import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email: email,
        password: password,
      });

      if (response.data.message === 'success') {
        setIsLoggedIn(true);
        navigate('/AdminPage');
        console.log('Login successful');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Login error:', error.response.data.message);
        setError(' อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('Network error');
      } else {
        console.error('Error:', error.message);
        setError('Something went wrong');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mt-2 p-1 text-sm text-blue-500 hover:underline focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {showPassword ? 'ซ่อนรหัสผ่าน' : 'เเสดงรหัสผ่าน'}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Login
        </button>
      </form>

      <p className="mt-4">
        {isLoggedIn && <span className="text-green-500">ยินดีต้อนรับ</span>}
        {!isLoggedIn && (
          <span>
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </span>
        )}
      </p>
    </div>
  );
}

export default Login;
