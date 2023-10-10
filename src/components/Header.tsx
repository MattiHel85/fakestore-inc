import React from 'react';

import { Typography } from "@mui/material"
import styles from '../styles/Header.module.css'
import { HeaderProps } from '../types/types';

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Typography variant='h3' className={styles.headerText}>
                {title}
    </Typography>
  )
}

export default Header