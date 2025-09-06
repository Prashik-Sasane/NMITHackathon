import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Calendar, Package, DollarSign, Eye, Download } from 'lucide-react'
import './PurchaseHistory.css'

const PurchaseHistory = () => {
  const { purchaseHistory } = useCart()
  const [selectedOrder, setSelectedOrder] = useState(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'completed'
      case 'shipped':
        return 'shipped'
      case 'delivered':
        return 'delivered'
      case 'cancelled':
        return 'cancelled'
      default:
        return 'pending'
    }
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
  }

  const handleCloseModal = () => {
    setSelectedOrder(null)
  }

  if (purchaseHistory.length === 0) {
    return (
      <div className="purchase-history">
        <div className="purchase-history-container">
          <div className="empty-history">
            <Package className="empty-icon" />
            <h2>No Purchase History</h2>
            <p>You haven't made any purchases yet. Start shopping to see your order history here.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="purchase-history">
      <div className="purchase-history-container">
        <div className="purchase-history-header">
          <h1>Purchase History</h1>
          <p>Track your orders and view past purchases</p>
        </div>

        <div className="orders-list">
          {purchaseHistory.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <div className="order-meta">
                    <div className="order-date">
                      <Calendar className="meta-icon" />
                      <span>{formatDate(order.date)}</span>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="order-summary">
                  <div className="order-total">
                    <DollarSign className="total-icon" />
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="order-items">
                    <Package className="items-icon" />
                    <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              <div className="order-items-preview">
                <div className="items-grid">
                  {order.items.slice(0, 3).map(item => (
                    <div key={item.id} className="item-preview">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="more-items">
                      +{order.items.length - 3} more items
                    </div>
                  )}
                </div>
              </div>

              <div className="order-actions">
                <button
                  className="view-order-btn"
                  onClick={() => handleViewOrder(order)}
                >
                  <Eye className="action-icon" />
                  View Details
                </button>
                <button className="download-invoice-btn">
                  <Download className="action-icon" />
                  Download Invoice
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedOrder && (
          <div className="order-modal-overlay" onClick={handleCloseModal}>
            <div className="order-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Order Details #{selectedOrder.id}</h2>
                <button className="close-btn" onClick={handleCloseModal}>
                  ×
                </button>
              </div>

              <div className="modal-content">
                <div className="order-details">
                  <div className="detail-row">
                    <span className="detail-label">Order Date:</span>
                    <span className="detail-value">{formatDate(selectedOrder.date)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={`detail-value status-badge ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Total:</span>
                    <span className="detail-value">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="order-items-detail">
                  <h3>Items Ordered</h3>
                  <div className="items-list">
                    {selectedOrder.items.map(item => (
                      <div key={item.id} className="order-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p>{item.description}</p>
                          <div className="item-meta">
                            <span>Quantity: {item.quantity}</span>
                            <span>Price: ${item.price}</span>
                            <span>Total: ${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-summary-detail">
                  <h3>Order Summary</h3>
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping:</span>
                      <span>FREE</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax:</span>
                      <span>${(selectedOrder.total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>${(selectedOrder.total * 1.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PurchaseHistory
