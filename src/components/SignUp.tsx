import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, Button, TextField } from "@mui/material";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { registerUser } from '../redux/slices/userSlice';
import styles from '../styles/styles.module.css';

const SignUp: React.FC = () => {
  const [userData, setUserData] = useState({    
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '',
    role: 'customer',
  });
  const [message, setMessage] = useState<string>(''); 

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const adminCode = 'makeMeAdmin'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    // Check if the input field is for the admin code
    if (name === 'adminCode') {
      // If the admin code matches, set the role to 'admin'
      if (value === adminCode) {
        setUserData(prevData => ({
          ...prevData,
          role: 'admin',
        }));
      }
    }
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    if (userData.password !== userData.confirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      return;
    }

    dispatch(registerUser(userData));
    setMessage('');
    navigate('/signin')
  };

  return (
    <Container className={styles.signInContainer}>
      {message && <Typography className={styles.message} variant="body2">{message}</Typography>}
      <form onSubmit={handleSignUp} className={styles.signInForm}>
        <TextField
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label="Avatar URL"
          name="avatar"
          value={userData.avatar}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label="Admin Code (Optional)"
          name="adminCode"
          type="password"
          onChange={handleInputChange}
          className={styles.textField}
        />
        <Button type='submit' className={styles.primaryButton}>Sign Up</Button>
      </form>

      <Link to={'/signin'} className={styles.linkText}>
        <Typography className={styles.textNotInForm} >Already have an account? Sign In</Typography>
      </Link>
    </Container>
  );
};

export default SignUp;