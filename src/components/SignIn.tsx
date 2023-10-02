import React, { useState} from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { Typography, Box, Button, TextField } from "@mui/material";

import { AppDispatch } from '../redux/store';
import { loginUser } from '../redux/slices/authSlice';

const SignIn: React.FC = () => {
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  })

const dispatch: AppDispatch = useDispatch();

const handleSignInChange = (e: any) => {
    const {name, value} = e.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSignIn = async () => {
    try {
      const { email, password } = signInData;
      console.log(signInData)
      await dispatch(loginUser({ email, password }));

      
    } catch (error) {
      console.error('Signin failed:', error)
    }
  }
  return (
    <Box
      sx={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
        <TextField
          label="Username"
          name="email" 
          value={signInData.email}
          onChange={handleSignInChange} 
          sx={{ 
            margin: '5px'
           }}
        />
        <TextField
          label="Password"
          type="password"
          name="password" 
          value={signInData.password}
          onChange={handleSignInChange} 
          sx={{ 
            margin: '5px'
           }}
        />
        <Button sx={{borderRadius: '25px', margin: '5px'}} onClick={handleSignIn}>Sign In</Button>
        <Typography
          sx={{ 
            margin: '5px'
          }}
        >FORGOT YOUR PASSWORD?</Typography>
        <Link to={'/signup'} style={{textDecoration:'none', color: 'black'}}>
          <Typography 
            sx={{ 
              margin: '5px'
            }}
           >SIGN UP</Typography>
        </Link>
    </Box>
  )
}

export default SignIn