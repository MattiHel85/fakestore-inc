import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/slices/rootSlice";
import { AppDispatch } from '../redux/store';
import { fetchProductById } from "../redux/slices/productSlice";
import { SingleProductProps } from "../types/Product";
import ProductCard from "./ProductCard";
import UpdateProduct from "./UpdateProduct";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { deleteProduct } from "../redux/slices/productSlice";
import styles from '../styles/ProductCard.module.css'
import Container from "@mui/material/Container";

const SingleProduct: React.FC<SingleProductProps> = ({ onAddToCart }) => {
    const [openProductUpdateForm, setOpenProductUpdateForm] = useState(false)

    const {id} = useParams();
    const dispatch: AppDispatch = useDispatch();    
    const { products, loading, error } = useSelector((state: any) => state.products);
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [dispatch, id]);

    const { items } = useSelector((state: RootState) => state.cart);

    
    const product = products.find((product: any) => product.id === Number(id));

    const user = useSelector((state: RootState) => state.auth.user);

    const handleToggleProductUpdateForm = () => {
        openProductUpdateForm && setOpenProductUpdateForm(false)
        !openProductUpdateForm && setOpenProductUpdateForm(true)
    }

    
    if (loading) {
        return <p>Loading...</p>;
    }

    
    if (error) {
        return <p>Error: {error}</p>;
    }

    
    if (!product) {
        return <p>Product not found.</p>;
    }

    const handleAddToCart = () => {
        if (product) {
            onAddToCart(product, items, dispatch);
        }
    };

    const handleDelete = () => {
        dispatch(deleteProduct(product.id));
    }

    return (
        <>
            <ProductCard 
                key={product.id} 
                product={product}
                items={items}
                dispatch={dispatch}
                onAddToCart={handleAddToCart}
            />
            { 
                openProductUpdateForm ?  <UpdateProduct product={product} /> : <></>            
            }  
            { user?.role === 'admin' ? 
                <Container 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box
                        sx={{
                            display:'flex',
                            justifyContent: 'space-around',
                            padding: '1em'
                        }}
                    >
                        
                            <Button 
                                onClick={() => navigate(-1)} 
                                className={styles.cardButton}
                            >
                                    Back
                            </Button>
                            <Button 
                                onClick={handleToggleProductUpdateForm} 
                                className={styles.cardUpdateButton}
                            >
                                    {
                                        openProductUpdateForm ? 'Complete' : 'Update Item'
                                    }
                            </Button>
                            <Button 
                                onClick={handleDelete} 
                                className={styles.cardDeleteButton}
                            >
                                    Delete 
                            </Button>
                    </Box>
                </ Container> : <></>
            }
        </>
    );
};

export default SingleProduct;