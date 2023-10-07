import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/slices/rootSlice";
import { User } from "../types/User";

import { UserCardProps } from "../types/User";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import UpdateUser from "./UpdateUser";

const UserCard: React.FC<UserCardProps> = ({ user}) => {
    // const user: User = { id, email, password, name, role, avatar}

    return(
        <>
            <Card key={user?.id} sx={{minHeight: '20em', width: '30%', margin: 'auto', marginTop: '2em'}}>
                <CardMedia 
                    sx={{
                        minHeight: '10em',
                        cursor: 'pointer'
                    }}
                    image={user?.avatar}
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
            <UpdateUser user={user} />
        </>

    )
}

export default UserCard