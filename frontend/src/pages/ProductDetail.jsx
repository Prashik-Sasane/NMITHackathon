import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { ArrowLeft, Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react'
import apiService from '../services/api'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      const response = await apiService.products.getById(id)
      if (response.success) {
        setProduct(response.data.product)
      }
    } catch (error) {
      console.error('Failed to load product:', error)
    }
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="product-detail-container">
          <div className="loading-state">
            <p>Product not found</p>
            <Link to="/marketplace" className="back-link">
              <ArrowLeft className="back-icon" />
              Back to Marketplace
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = async () => {
    const result = await addToCart(product, quantity)
    if (!result.success) {
      alert(result.error || 'Failed to add item to cart')
    }
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}
        size={20}
      />
    ))
  }

  // Use product images or fallback to single image
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image]

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft className="back-icon" />
          Back
        </button>

        <div className="product-detail-content">
          <div className="product-images">
            <div className="main-image">
              <img src={productImages[selectedImage] || product.image} alt={product.name} />
              <button
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart size={24} />
              </button>
            </div>
            
            <div className="image-thumbnails">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image || product.image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating?.average || product.rating || 0)}
                </div>
                <span className="rating-text">
                  {product.rating?.average || product.rating || 0} ({product.rating?.count || product.reviews || 0} reviews)
                </span>
              </div>
            </div>

            <div className="product-price">
              <span className="current-price">${product.price}</span>
              <span className="stock-status">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                <li>High-quality materials and construction</li>
                <li>Excellent customer reviews and ratings</li>
                <li>Fast and reliable shipping</li>
                <li>30-day return policy</li>
                <li>1-year manufacturer warranty</li>
              </ul>
            </div>

            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="quantity-btn"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="product-actions">
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="buy-now-btn" disabled={product.stock === 0}>
                Buy Now
              </button>
            </div>

            <div className="shipping-info">
              <div className="shipping-item">
                <Truck className="shipping-icon" />
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over $50</p>
                </div>
              </div>
              <div className="shipping-item">
                <Shield className="shipping-icon" />
                <div>
                  <strong>Secure Payment</strong>
                  <p>100% secure checkout</p>
                </div>
              </div>
              <div className="shipping-item">
                <RotateCcw className="shipping-icon" />
                <div>
                  <strong>Easy Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-reviews">
          <h2>Customer Reviews</h2>
          <div className="reviews-summary">
            <div className="rating-breakdown">
              <div className="overall-rating">
                <span className="rating-number">{product.rating}</span>
                <div className="stars-large">
                  {renderStars(product.rating)}
                </div>
                <p>Based on {product.reviews} reviews</p>
              </div>
            </div>
          </div>
          
          <div className="reviews-list">
            <div className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">John D.</span>
                  <div className="review-rating">
                    {renderStars(5)}
                  </div>
                </div>
                <span className="review-date">2 days ago</span>
              </div>
              <p className="review-text">
                Excellent product! Great quality and fast shipping. Highly recommend!
              </p>
            </div>
            
            <div className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">Sarah M.</span>
                  <div className="review-rating">
                    {renderStars(4)}
                  </div>
                </div>
                <span className="review-date">1 week ago</span>
              </div>
              <p className="review-text">
                Good product overall. Met my expectations and arrived on time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
