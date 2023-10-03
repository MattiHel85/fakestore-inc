import { CartItem } from '../types/Cart';
import { Product } from '../types/Product';
import { clearCart, addToCart } from '../redux/slices/cartSlice';
import { AppDispatch } from '../redux/store';
import { debounce } from './debounce';

const handleAddToCart = (
  product: Product,
  items: CartItem[],
  dispatch: AppDispatch
) => {
  
  const existingCartItem = items.find((item) => item.id === product.id);

  if (existingCartItem) {
    
    const updatedCartItems = items.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    dispatch(clearCart()); 
    updatedCartItems.forEach((item) => dispatch(addToCart(item))); 
  } else {
    const cartItem: CartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
    };

    dispatch(addToCart(cartItem)); 
  }
};

const debouncedHandleAddToCart = debounce(handleAddToCart, 500);

export default debouncedHandleAddToCart;
