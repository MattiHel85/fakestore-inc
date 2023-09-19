import React from 'react'

import { StyledEngineProvider } from '@mui/material'

import TopAppBar from './components/TopAppBar'
import NavBar from './components/NavBar'
import Header from './components/Header'

const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <TopAppBar />
        <NavBar />
        <Header title='Welcome to my fake shop'/>
      </StyledEngineProvider>
    </>
  )
}

export default App