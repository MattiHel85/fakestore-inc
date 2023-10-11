import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import SingleUser from '../components/SingleUser';

const SingleUserPage: React.FC = () => {

  return (
    <>
        <TopAppBar />
        <NavBar />
        <SingleUser />
    </>
  )
}

export default SingleUserPage