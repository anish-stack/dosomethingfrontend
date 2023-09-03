import React from "react";
import "../App.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CartPage = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  console.log(cartItems)

  const removeFromCart = (productId) => {

    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const increaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const handleProceedToCheckout = () => {
    console.log("Cart items:", cartItems);
    navigate("/checkout", { state: cartItems }); // Pass cartItems data as state to the checkout page
  };
  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.productImg[0]} alt={item.name} className="item-image" />
            <div className="item-info">
              <p className="item-name">{item.name}</p>
              <p className="item-price">Rs {item.price}</p>
              <div className="item-quantity">
                <button className="increase" onClick={() => decreaseQuantity(item.id)}>-</button>
                <p className="quantity">{item.quantity}</p>
                <button className="increase" onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
            </div>
            <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <p className="subtotal">Subtotal: Rs {calculateSubtotal()}</p>
      <Link to={{ pathname: "/checkout", search: `?cartItems=${encodeURIComponent(JSON.stringify(cartItems))}` }}>
  <button onClick={handleProceedToCheckout} className="checkout-button">
    Proceed to Checkout
  </button>
</Link>

      <p className="disclaimer">
        * Prices are subject to change. Items may be removed if stock is depleted.
      </p>
    </div>
    
  );
};

export default CartPage;