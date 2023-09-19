import React from 'react'

import { StyledEngineProvider } from '@mui/material'

import TopAppBar from './components/TopAppBar'
import NavBar from './components/NavBar'
import Header from './components/Header'
import Container from './components/Container'

const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <TopAppBar />
        <NavBar />
        <Header title='Welcome to my fake shop'/>
        <Container />
      </StyledEngineProvider>
    </>
  )
}

export default App