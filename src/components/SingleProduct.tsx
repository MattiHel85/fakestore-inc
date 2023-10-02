import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/slices/rootSlice";
import { AppDispatch } from '../redux/store';
import { fetchProductById } from "../redux/slices/productSlice";
import { SingleProductProps } from "../types/Product";
import ProductCard from "./ProductCard";
import UpdateProduct from "./UpdateProduct";

const SingleProduct: React.FC<SingleProductProps> = ({ onAddToCart }) => {
    const {id} = useParams();
    const dispatch: AppDispatch = useDispatch();    
    const { products, loading, error } = useSelector((state: any) => state.products);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [dispatch, id]);

    const { items } = useSelector((state: RootState) => state.cart);

    
    const product = products.find((product: any) => product.id === Number(id));

    
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

    return (
        <>
            <ProductCard 
                key={product.id} 
                product={product}
                items={items}
                dispatch={dispatch}
                onAddToCart={handleAddToCart}
            />
            <UpdateProduct product={product} />
        </>
    );
};

export default SingleProduct;
