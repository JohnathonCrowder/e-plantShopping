import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },

    updateQuantity: (state, action) => {
      const { name, operation } = action.payload;
      const item = state.items.find(item => item.name === name);
      
      if (item) {
        if (operation === 'increment') {
          item.quantity += 1;
        } else if (operation === 'decrement') {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            // Remove item if quantity would become 0
            state.items = state.items.filter(item => item.name !== name);
          }
        }
      }
    },

    // Optional: Add a clear cart reducer if needed
    clearCart: (state) => {
      state.items = [];
    },

    // Optional: Add a set quantity reducer if needed
    setQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },

    // Optional: Add a calculate total reducer if needed
    calculateTotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + (parseFloat(item.cost) * item.quantity);
      }, 0);
    }
  },
});

// Export actions
export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart, 
  setQuantity, 
  calculateTotal 
} = CartSlice.actions;

// Selector to get cart items
export const selectCartItems = state => state.cart.items;

// Selector to get cart total
export const selectCartTotal = state => {
  return state.cart.items.reduce((total, item) => {
    return total + (parseFloat(item.cost) * item.quantity);
  }, 0);
};

// Selector to get cart item count
export const selectCartItemCount = state => {
  return state.cart.items.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
};

export default CartSlice.reducer;