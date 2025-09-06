import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import apiService from '../services/api'

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
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      // Load cart and purchase history from backend when user is authenticated
      loadCart()
      loadPurchaseHistory()
    } else {
      // Clear cart when user logs out
      setCartItems([])
      setPurchaseHistory([])
    }
  }, [user])

  const loadCart = async () => {
    try {
      setLoading(true)
      const response = await apiService.cart.get()
      if (response.success) {
        setCartItems(response.data.cart.items || [])
      }
    } catch (error) {
      console.error('Failed to load cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadPurchaseHistory = async () => {
    try {
      const response = await apiService.orders.getMyOrders()
      if (response.success) {
        setPurchaseHistory(response.data.orders || [])
      }
    } catch (error) {
      console.error('Failed to load purchase history:', error)
    }
  }

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      throw new Error('You must be logged in to add items to cart')
    }

    try {
      setLoading(true)
      const response = await apiService.cart.addItem(product._id || product.id, quantity)
      
      if (response.success) {
        setCartItems(response.data.cart.items || [])
        return { success: true }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (productId) => {
    if (!user) return

    try {
      setLoading(true)
      const response = await apiService.cart.removeItem(productId)
      
      if (response.success) {
        setCartItems(response.data.cart.items || [])
        return { success: true }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (productId, quantity) => {
    if (!user) return

    try {
      setLoading(true)
      const response = await apiService.cart.updateItem(productId, quantity)
      
      if (response.success) {
        setCartItems(response.data.cart.items || [])
        return { success: true }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    if (!user) return

    try {
      setLoading(true)
      const response = await apiService.cart.clear()
      
      if (response.success) {
        setCartItems([])
        return { success: true }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || item.price || 0
      return total + (price * item.quantity)
    }, 0)
  }

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const checkout = async (shippingAddress, paymentInfo) => {
    if (!user) {
      throw new Error('You must be logged in to checkout')
    }

    try {
      setLoading(true)
      const orderData = {
        shippingAddress,
        paymentInfo
      }

      const response = await apiService.orders.create(orderData)
      
      if (response.success) {
        const order = response.data.order
        setPurchaseHistory(prev => [order, ...prev])
        setCartItems([])
        return { success: true, order }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const refreshPurchaseHistory = async () => {
    await loadPurchaseHistory()
  }

  const value = {
    cartItems,
    purchaseHistory,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    checkout,
    refreshPurchaseHistory
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
