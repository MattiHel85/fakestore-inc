import React from "react";

import { UserCardProps } from "../types/User";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';

const UserCard: React.FC<UserCardProps> = ({ id, email, password, name, role, avatar}) => {

    return(
        <>
            <Card key={id} sx={{minHeight: '20em', width: '30%', margin: 'auto', marginTop: '2em'}}>
                <CardMedia 
                    sx={{
                        minHeight: '10em',
                        cursor: 'pointer'
                    }}
                    image={avatar}
                />
                <CardContent>
                    <Typography variant="h5">
                        {name}
                    </Typography>
                    <Typography>
                        {role}
                    </Typography>
                    <Typography>
                        {email}
                    </Typography>
                </CardContent>
                {/* <CardActions
                    sx={{
                        display:'flex',
                        justifyContent: 'space-between',
                        padding: '2em'
                    }}
                >
                    <Typography variant="h5">
                        €{product.price}
                    </Typography>

                    <Button 
                        onClick={handleAddToCart} 
                        className={styles.cardButton}
                        size='large'>
                            Add to cart
                    </Button>
                </CardActions> */}
            </Card>   
        </>

    )
}

export default UserCard