import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add item to cart
    addItem: (state, action) => {
      // Check if item already exists in cart
      const existingItem = state.items.find(item => item.name === action.payload.name);
      
      if (existingItem) {
        // If item exists, increment quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add new item
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }
    },

    // Remove item from cart
    removeItem: (state, action) => {
      // Filter out the item with matching name
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },

    // Update quantity of an item
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

    // Optional: Clear entire cart
    clearCart: (state) => {
      state.items = [];
    },

    // Optional: Set specific quantity
    setQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    }
  }
});

// Export actions
export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart, 
  setQuantity 
} = CartSlice.actions;

// Selectors
export const selectCartItems = state => state.cart.items;

export const selectCartTotal = state => {
  return state.cart.items.reduce((total, item) => {
    return total + (item.cost * item.quantity);
  }, 0);
};

export const selectCartItemCount = state => {
  return state.cart.items.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
};

// Export reducer
export default CartSlice.reducer;

// Optional: Action creators with additional logic
export const addItemWithValidation = (item) => (dispatch, getState) => {
  // Add any validation logic here
  const state = getState();
  const existingItem = state.cart.items.find(i => i.name === item.name);
  
  if (!existingItem) {
    dispatch(addItem(item));
  }
};

// Optional: Thunk for async operations
export const addItemAsync = (item) => async (dispatch) => {
  try {
    // Simulate API call or async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch(addItem(item));
  } catch (error) {
    console.error('Error adding item:', error);
  }
};