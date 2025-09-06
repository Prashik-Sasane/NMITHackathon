import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Search, Filter, Star, ShoppingCart, Heart } from 'lucide-react'
import apiService from '../services/api'
import './Marketplace.css'

const Marketplace = () => {
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showFilters, setShowFilters] = useState(false)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  })

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [selectedCategory, sortBy, priceRange, searchTerm])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const params = {
        page: 1,
        limit: 50,
        ...(selectedCategory !== 'All' && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm }),
        ...(priceRange[0] > 0 && { minPrice: priceRange[0] }),
        ...(priceRange[1] < 1000 && { maxPrice: priceRange[1] }),
        sort: sortBy === 'name' ? 'name' : sortBy === 'price-low' ? 'price' : sortBy === 'price-high' ? 'price' : 'createdAt',
        order: sortBy === 'price-high' ? 'desc' : 'asc'
      }

      const response = await apiService.products.getAll(params)
      
      if (response.success) {
        setProducts(response.data.products)
        setPagination(response.data.pagination)
      }
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await apiService.products.getCategories()
      if (response.success) {
        setCategories(['All', ...response.data.categories])
      }
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const handleAddToCart = async (product) => {
    const result = await addToCart(product, 1)
    if (!result.success) {
      alert(result.error || 'Failed to add item to cart')
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}
        size={16}
      />
    ))
  }

  return (
    <div className="marketplace">
      <div className="marketplace-container">
        <div className="marketplace-header">
          <h1>Marketplace</h1>
          <p>Discover amazing products at great prices</p>
        </div>

        <div className="marketplace-controls">
          <div className="search-section">
            <div className="search-bar">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="filter-icon" />
              Filters
            </button>
          </div>

          <div className="sort-section">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="marketplace-content">
          {showFilters && (
            <div className="filters-sidebar">
              <h3>Filters</h3>
              
              <div className="filter-group">
                <h4>Category</h4>
                <div className="category-filters">
                  {categories.map(category => (
                    <label key={category} className="filter-option">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Price Range</h4>
                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="price-slider"
                  />
                  <div className="price-display">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>
            </div>
          )}

        <div className="products-grid">
          {loading ? (
            <div className="loading-products">
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          ) : (
            products.map(product => (
                <div key={product._id || product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.images?.[0] || product.image} alt={product.name} />
                    <button className="wishlist-btn">
                      <Heart size={20} />
                    </button>
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-rating">
                      <div className="stars">
                        {renderStars(product.rating?.average || product.rating || 0)}
                      </div>
                      <span className="rating-text">
                        {product.rating?.average || product.rating || 0} ({product.rating?.count || product.reviews || 0} reviews)
                      </span>
                    </div>
                    
                    <div className="product-price">
                      <span className="price">${product.price}</span>
                      <span className="stock">
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    
                    <div className="product-actions">
                      <Link to={`/product/${product._id || product.id}`} className="view-details-btn">
                        View Details
                      </Link>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marketplace
