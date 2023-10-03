import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../../types/Cart';


const initialState: CartState = {
    items: [],
    loading: false,
    error: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
          state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
          state.items = [];
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
              if (item.quantity > 1) {
                item.quantity -= 1;
              } else {
                // If quantity is 1 or less, remove the item from the cart
                state.items = state.items.filter((item) => item.id !== action.payload);
              }
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
              item.quantity += 1;
            }
          },
    }
})

export const { addToCart, removeFromCart, clearCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;