import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../redux/slices/userSlice';
import { User } from '../types/User';
import { AppDispatch } from '../redux/store';

import UserCard from './UserCard';
import { Container } from '@mui/system';

const Users: React.FC = () => {
  const {users,loading,error} = useSelector((state: any) => state.users)
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])

  return (
    <Container
      sx={{
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users.map((user: User) => <UserCard id={user.id} name={user.name} email={user.email} role={user.role} />)}
    </ Container>
  );
};

export default Users;