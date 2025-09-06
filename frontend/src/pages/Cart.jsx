import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react'
import './Cart.css'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, checkout } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId)
    } else {
      const result = await updateQuantity(productId, newQuantity)
      if (!result.success) {
        alert(result.error || 'Failed to update quantity')
      }
    }
  }

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    setIsCheckingOut(true)
    
    // Mock shipping address and payment info for demo
    const shippingAddress = {
      firstName: user.profile?.firstName || 'John',
      lastName: user.profile?.lastName || 'Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '123-456-7890'
    }

    const paymentInfo = {
      method: 'credit_card'
    }
    
    const result = await checkout(shippingAddress, paymentInfo)
    setIsCheckingOut(false)
    
    if (result.success) {
      // Navigate to purchase history or show success message
      navigate('/purchase-history')
    } else {
      alert(result.error || 'Checkout failed')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="cart-container">
          <div className="empty-cart">
            <ShoppingBag className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/marketplace" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-header">
          <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft className="back-icon" />
            Back
          </button>
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.product?.images?.[0] || item.image} alt={item.product?.name || item.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.product?.name || item.name}</h3>
                  <p className="item-description">{item.product?.description || item.description}</p>
                  <div className="item-price">${item.product?.price || item.price}</div>
                </div>
                
                <div className="item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="item-total">
                  <div className="total-price">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free">FREE</span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
              </div>
              
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                <CreditCard className="checkout-icon" />
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              
              <Link to="/marketplace" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
            
            <div className="shipping-info">
              <h4>Shipping Information</h4>
              <div className="shipping-details">
                <div className="shipping-item">
                  <strong>Free Shipping</strong>
                  <p>On orders over $50</p>
                </div>
                <div className="shipping-item">
                  <strong>Standard Delivery</strong>
                  <p>3-5 business days</p>
                </div>
                <div className="shipping-item">
                  <strong>Express Delivery</strong>
                  <p>1-2 business days (+$9.99)</p>
                </div>
              </div>
            </div>
            
            <div className="security-info">
              <h4>Secure Checkout</h4>
              <p>Your payment information is encrypted and secure. We never store your credit card details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
