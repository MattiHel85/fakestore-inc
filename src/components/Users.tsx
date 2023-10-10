import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../redux/slices/userSlice';
import { User } from '../types/User';
import { AppDispatch } from '../redux/store';

import UserCard from './UserCard';
import { Container } from '@mui/system';
import { RootState } from '../redux/slices/rootSlice';
import styles from '../styles/Users.module.css'

const Users: React.FC = () => {
  const {users,loading,error} = useSelector((state: RootState) => state.users)
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])

  return (
    <Container className={styles.usersContainer} >
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users.map((user: User) => <UserCard user={user} />)}
    </ Container>
  );
};

export default Users;