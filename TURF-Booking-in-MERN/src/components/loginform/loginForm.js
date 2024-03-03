import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './loginform.css';
import Avatar from './assets/avatar.png';
import axios from 'axios';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

  
  const handleLogin = async () => {
    const apiUrl = `http://localhost:5000/login`;
  
    try {
      const response = await axios.post(apiUrl, {
        username,
        password,
      });
      console.log(response.data.user._id);
      setUserId(response.data.user._id);
  
      if (response.status === 200) {
        navigate(`/dashboard/${response.data.user._id}`); // Redirect to dashboard with user ID
        toast.success('Login successful');
      } else {
        console.error('Login failed');
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      toast.error('Error during login');
    }
  };
  

  return (
    <div className={`loginform show`}>
      <div className='login-form-container'>
        <div className='avatar'>
          <img src={Avatar} alt='Avatar image' />
        </div>
        <div className='login-form-title'>Login</div>
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='login-button' onClick={handleLogin}>
          Login
        </button>

        <div className='create-account'>
          Don't have an account? <a href='#'>Create one</a>
        </div>
        <ToastContainer
          position='top-left'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}
