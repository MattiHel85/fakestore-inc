import React from 'react';
import { Typography } from "@mui/material"
import { HeaderProps } from '../types/types';


const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Typography variant='h3' sx={{textAlign: 'center', my: '2.5em'}}>
                {title}
    </Typography>
  )
}

export default Header