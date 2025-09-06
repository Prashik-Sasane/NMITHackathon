import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [purchaseHistory, setPurchaseHistory] = useState([])

  useEffect(() => {
    // Load cart and purchase history from localStorage
    const storedCart = localStorage.getItem('cart')
    const storedHistory = localStorage.getItem('purchaseHistory')
    
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
    if (storedHistory) {
      setPurchaseHistory(JSON.parse(storedHistory))
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const checkout = () => {
    const order = {
      id: Date.now().toString(),
      items: [...cartItems],
      total: getCartTotal(),
      date: new Date().toISOString(),
      status: 'completed'
    }
    
    setPurchaseHistory(prev => [order, ...prev])
    localStorage.setItem('purchaseHistory', JSON.stringify([order, ...purchaseHistory]))
    clearCart()
    
    return order
  }

  const value = {
    cartItems,
    purchaseHistory,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    checkout
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
