// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// import { RootState } from "../redux/slices/rootSlice";

// import { deleteProduct } from "../redux/slices/productSlice";
// import { ProductCardProps } from "../types/Product";
// import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
// import styles from '../styles/ProductCard.module.css'

// const ProductCard: React.FC = () => {

//     const navigate = useNavigate();
//     const id = product?.id;
//     const firstImage = product?.images?.[0];

//     const navigateToProduct = () => {
//         navigate(`/products/${id}`)
//     }

//     const handleAddToCart = () => {
//         onAddToCart(product, items, dispatch);
//     }

//     // const handleDelete = () => {
//     //     dispatch(deleteProduct(id));
//     // }
    
//     const user = useSelector((state: RootState) => state.auth.user);

//     return(
//         <>
//             <Card key={product.id} sx={{minHeight: '35em', width: '30%', margin: 'auto', marginTop: '2em'}}>
//                 <CardMedia 
//                     onClick={navigateToProduct}
//                     sx={{
//                         minHeight: '30em',
//                         cursor: 'pointer'
//                     }}
//                     image={firstImage}
//                 />
//                 <CardContent>
//                     <Typography variant="h5">
//                         {product.title}
//                     </Typography>
//                     <Typography>
//                         {product.description}
//                     </Typography>
//                 </CardContent>
//                 <CardActions
//                     sx={{
//                         display:'flex',
//                         justifyContent: 'space-between',
//                         padding: '2em'
//                     }}
//                 >
//                     <Typography variant="h5">
//                         €{product.price}
//                     </Typography>

//                     <Button 
//                         onClick={handleAddToCart} 
//                         className={styles.cardButton}
//                         size='large'>
//                             Add to cart
//                     </Button>
//                 </CardActions>
//             </Card>   
//         </>

//     )
// }

// export default ProductCard;

export {}