import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { updateUser } from '../redux/slices/userSlice'; 
import { UpdateUserProps } from '../types/User';
import { User } from '../types/User';

const UpdateUser: React.FC<UpdateUserProps> = ({ user }) => {
  const [userData, setUserData] = useState<User>({
    id: 0,
    name: '',
    email: '',
    password: '',
    avatar: '',
    role: 'customer',
  });

  useEffect(() => {
    if (user) {
      setUserData(prevData => ({
        ...prevData,
        id: user.id || 0,
        name: user.name || '',
        email: user.email || '',
        password: user.password || '',
        avatar: user.avatar || '',
        role: user.role || 'customer',
      }));
    }
  }, [user]);

  const dispatch: AppDispatch = useDispatch();
  const adminCode = 'makeMeAdmin';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'adminCode' && value === adminCode) {
      setUserData(prevData => ({
        ...prevData,
        role: 'admin',
      }));
    }
  };

  const handleUpdateUser = () => {
    dispatch(updateUser(userData));
  };

  if (!user) {
    return <div>Loading...</div>; 
  }


  return (
    <Box
      sx={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        margin: 'auto'
      }}
    >
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
        onClick={handleUpdateUser}
      >
        Update User
      </Button>
    </Box>
  );
};

export default UpdateUser;
