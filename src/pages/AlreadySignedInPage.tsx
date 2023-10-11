import React from 'react';
import { useSelector } from 'react-redux';

import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import Header from '../components/Header';

import { RootState } from '../redux/slices/rootSlice';

const AlreadySignedInPage: React.FC = () => {
  
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
        <TopAppBar />
        <NavBar />
        <Header title={`You're already signed in as user ${user?.name}.`} body={'You need to log out before you can perform this action.'}/>
    </>
  )
}

export default AlreadySignedInPage