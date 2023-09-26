import React from "react";
import { useNavigate } from "react-router-dom";

import { ProductCardProps } from "../types/Product";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import styles from '../styles/ProductCard.module.css'

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const navigate = useNavigate();
    const id = product.id;

    const navigateToProduct = () => {
        navigate(`/products/${id}`)
    }

    const handleAddToCart = () => {
        onAddToCart(product)
    }

    return(
        <Card key={product.id} sx={{height: '30em', width: '30%', margin: 'auto', marginTop: '2em'}}>
            <CardMedia 
                onClick={navigateToProduct}
                sx={{
                    height: 240,
                    cursor: 'pointer'
                }}
                image={product.images[0]}
            />
            <CardContent>
                <Typography variant="h5">
                    {product.title}
                </Typography>
                <Typography>
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display:'flex',
                    justifyContent: 'space-between',
                    padding: '1em'
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
            </CardActions>
        </Card>
    )
}

export default ProductCard;