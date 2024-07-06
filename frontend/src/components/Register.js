import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

const Register = ({ setAuth }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', { username, password })
      localStorage.setItem('token', res.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setAuth(true)
      navigate('/login') // Redirect to login page after successful registration
    } catch (error) {
      setErrorMessage('User already exists!')
    }
  }

  return (

    <div className="auth-container">
       <div className="intro-message">
        <h1>Welcome to Efficient-Task!</h1>
        <p>Organize your tasks efficiently with our simple and intuitive task management system.</p>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </form>
    </div>
  )
}

export default Register
