import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = typeof item.cost === 'string' 
        ? parseFloat(item.cost.replace('$', '')) 
        : item.cost;
      return total + (cost * item.quantity);
    }, 0).toFixed(2);
  };

  // Handle continue shopping button click
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // Handle checkout button click
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Handle increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      operation: 'increment'
    }));
  };

  // Handle decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      // Remove item if quantity would become 0
      dispatch(removeItem({ name: item.name }));
    } else {
      dispatch(updateQuantity({
        name: item.name,
        operation: 'decrement'
      }));
    }
  };

  // Handle remove item
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Calculate total cost for an individual item
  const calculateTotalCost = (item) => {
    const cost = typeof item.cost === 'string' 
      ? parseFloat(item.cost.replace('$', '')) 
      : item.cost;
    return (cost * item.quantity).toFixed(2);
  };

  // Calculate total quantity of items in cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Shopping Cart ({totalQuantity} items)</h2>
      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty</p>
          <button 
            className="get-started-button" 
            onClick={handleContinueShopping}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div>
            {cart.map(item => (
              <div className="cart-item" key={item.name}>
                <img 
                  className="cart-item-image" 
                  src={item.image} 
                  alt={item.name} 
                />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">
                    Unit Price: ${typeof item.cost === 'string' 
                      ? item.cost.replace('$', '') 
                      : item.cost}
                  </div>
                  <div className="cart-item-quantity">
                    <button 
                      className="cart-item-button cart-item-button-dec" 
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">
                      {item.quantity}
                    </span>
                    <button 
                      className="cart-item-button cart-item-button-inc" 
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    Subtotal: ${calculateTotalCost(item)}
                  </div>
                  <button 
                    className="cart-item-delete" 
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="total_cart_amount">
            Total Amount: ${calculateTotalAmount()}
          </div>
          <div className="continue_shopping_btn">
            <button 
              className="get-started-button" 
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
            <br />
            <button 
              className="get-started-button1" 
              onClick={handleCheckoutShopping}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;