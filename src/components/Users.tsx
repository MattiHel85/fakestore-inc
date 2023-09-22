import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../store/reducers/userSlice';
import { User } from '../types/User';
import { AppDispatch } from '../store/store';

import Header from './Header';

const Users: React.FC = () => {
  const {users,loading,error} = useSelector((state: any) => state.users)
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])

  return (
    <div>
      <Header title='User List' />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
              <img src={user.avatar} alt={`Avatar for user: ${user.name}`}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;