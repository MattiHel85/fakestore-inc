import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { updateUser } from '../redux/slices/userSlice'; 
import { UpdateUserProps } from '../types/User';
import { User } from '../types/User';
import styles from '../styles/styles.module.css';

import { useLanguage } from '../contextAPI/LanguageContext';
import { getTranslation } from '../contextAPI/translations/TranslationService';

const UpdateUser: React.FC<UpdateUserProps> = ({ user, setUser }) => {
  const {language} = useLanguage();
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
  const navigate = useNavigate();

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

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(userData));
    navigate(`/users/${userData.id}`)
  };

  if (!user) {
    return <div>Loading...</div>; 
  }


  return (
    <Box className={styles.signInContainer}>
      <form onSubmit={handleUpdateUser} className={styles.signInForm}>
        <TextField
          label={getTranslation(language, 'Name')}
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Email')}
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Password')}
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Avatar URL')}
          name="avatar"
          value={userData.avatar}
          onChange={handleInputChange}
          className={styles.textField}
        />
        <TextField
          label={getTranslation(language, 'Admin Code (optional)')}
          name="adminCode"
          type="password"
          onChange={handleInputChange}
          className={styles.textField}
        />
        <Button type='submit' className={styles.primaryButton}>
          {getTranslation(language, 'Update user')}
        </Button>
      </form>
      
    </Box>
  );
};

export default UpdateUser;
