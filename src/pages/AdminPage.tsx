import React from 'react';
import TopAppBar from '../components/TopAppBar';
import NavBar from '../components/NavBar';
import AdminPanel from '../components/AdminPanel';

const AdminPage: React.FC = () => {


  return (
    <>
        <TopAppBar />
        <NavBar />
        <AdminPanel />
    </>
  )
}

export default AdminPage