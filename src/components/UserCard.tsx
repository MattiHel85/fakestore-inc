import React from "react";
import { useNavigate } from "react-router-dom";

import { UserCardProps } from "../types/User";
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import styles from '../styles/styles.module.css'

const UserCard: React.FC<UserCardProps> = ({ user}) => {
    const navigate = useNavigate()

    const navigateToUser = () => {
        navigate(`/users/${user?.id}`)
    }

    return(
        <>
            <Card key={user?.id} className={styles.card}>
                <CardMedia 
                    className={styles.cardMedia}
                    image={user?.avatar}
                    onClick={navigateToUser}
                />
                <CardContent>
                    <Typography variant="h5">
                        {user?.name}
                    </Typography>
                    <Typography>
                        {user?.role}
                    </Typography>
                    <Typography>
                        {user?.email}
                    </Typography>
                </CardContent>
            </Card>   
        </>

    )
}

export default UserCard