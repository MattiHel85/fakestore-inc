import React from 'react'
import { StyledEngineProvider } from '@mui/material'

import TopAppBar from './components/TopAppBar'
import NavBar from './components/NavBar'
import Container from './components/Container'

const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <TopAppBar />
        <NavBar />
        <Container />
      </StyledEngineProvider>
    </>
  )
}

export default App