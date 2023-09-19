import React from 'react';
import { Typography, Box } from "@mui/material"
import Header from './Header';


const Container: React.FC = () => {
  return (
    <Box>
        <Header title='Container'/>
        <Typography variant='body1'>Container text</Typography>    
    </Box>
  )
}

export default Container