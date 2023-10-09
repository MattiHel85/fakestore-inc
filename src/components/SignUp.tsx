import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, TextField } from "@mui/material";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { registerUser } from '../redux/slices/userSlice';
import Header from './Header';

const SignUp: React.FC = () => {
  const [userData, setUserData] = useState({    
    name: '',
    email: '',
    password: '',
    avatar: '',
    role: 'customer',
  });

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

  const handleSignUp = () => {
    dispatch(registerUser(userData));
  };

  return (
    <Container
        sx={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            margin: 'auto'
      }}
    >
      <Header title='Sign Up' />
      <TextField
        label="Name"
        name="name"
        value={userData.name}
        onChange={handleInputChange}
        sx={{ 
          margin: '5px'
         }}
      />
      <TextField
        label="Email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        sx={{ 
            margin: '5px'
           }}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
        sx={{ 
            margin: '5px'
           }}
      />
      <TextField
        label="Avatar URL"
        name="avatar"
        value={userData.avatar}
        onChange={handleInputChange}
        sx={{ 
            margin: '5px'
           }}
      />
      <TextField
        label="Admin Code (Optional)"
        name="adminCode"
        type="password"
        onChange={handleInputChange}
        sx={{ 
            margin: '5px'
           }}
      />
      <Button 
        sx={{ 
            borderRadius: '25px',
            width: '40%',
            margin: 'auto'
        }} 
        onClick={handleSignUp}
       >Sign Up</Button>
      <Typography sx={{textAlign: 'center'}}>
        <Link to={'/signin'} style={{textDecoration: 'none', color: 'black'}}>Already have an account? Sign In</Link>
      </Typography>
    </Container>
  );
};

export default SignUp;