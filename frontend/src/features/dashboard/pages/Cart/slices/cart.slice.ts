import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { CartItem, CartState } from '@props';

      
const initialState: CartState = {
    items: [],
    status: 'idle',
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addCartItem: (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.items.find(item => item.listingId === action.payload.listingId);
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      },
      updateCartItem: (state, action: PayloadAction<CartItem>) => {
        const itemIndex = state.items.findIndex(item => item.listingId === action.payload.listingId);
        if (itemIndex !== -1) {
          state.items[itemIndex] = action.payload;
        }
      },
      removeCartItem: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.listingId !== action.payload);
      },
      clearCartItem: (state) => {
        state.items = [];
      },
    },
  });
  

export const usecart = (state:RootState)=>state.cart
export const {addCartItem, removeCartItem, updateCartItem, getCartItem, clearCartItem} = cartSlice.actions;
export default cartSlice.reducer;