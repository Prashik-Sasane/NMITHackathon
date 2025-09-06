# Marketplace Application

A full-stack e-commerce marketplace application built with React (Frontend) and Express.js (Backend) with MongoDB database.

## 🚀 Features

### Frontend Features
- **Authentication System**
  - User Registration & Login
  - Password validation and security
  - Protected routes
  - User profile management

- **Product Management**
  - Browse products with filtering and search
  - Product categories and sorting
  - Product detail pages with reviews
  - Admin product management (CRUD operations)

- **Shopping Cart**
  - Add/remove items from cart
  - Update quantities
  - Real-time cart updates
  - Cart persistence

- **Order Management**
  - Checkout process
  - Order history
  - Order tracking
  - Order status updates

- **User Dashboard**
  - Profile editing
  - Password change
  - Order history
  - Account settings

### Backend Features
- **RESTful API**
  - Complete CRUD operations
  - Authentication & Authorization
  - Input validation
  - Error handling

- **Database Models**
  - User management
  - Product catalog
  - Order processing
  - Shopping cart

- **Security**
  - JWT authentication
  - Password hashing
  - Input sanitization
  - Rate limiting

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library
- **CSS3** - Styling with modern features
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

## 📁 Project Structure

```
NMITHackathon/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/             # React Context for state management
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── PurchaseHistory.jsx
│   │   │   ├── ProductManagement.jsx
│   │   │   └── *.css           # Page-specific styles
│   │   ├── data/               # Mock data
│   │   │   └── mockProducts.js
│   │   ├── App.jsx             # Main app component
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/
│   │   └── db.js               # Database configuration
│   ├── controller/             # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── models/                 # Database models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── app.js                  # Express app setup
│   ├── package.json
│   └── env.example
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NMITHackathon
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file from example
   cp env.example .env
   
   # Update .env with your configuration
   # Start MongoDB service
   # Run the backend
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Start the frontend
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/marketplace
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=12&category=Electronics&sort=price&order=asc
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product (Admin)
```http
POST /api/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 100,
  "images": ["https://example.com/image.jpg"]
}
```

### Cart Endpoints

#### Get User Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

#### Add Item to Cart
```http
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product-id",
  "quantity": 2
}
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "phone": "123-456-7890"
  },
  "paymentInfo": {
    "method": "credit_card"
  }
}
```

## 🎨 Frontend Pages

### 1. Authentication Pages
- **Login Page** (`/login`)
  - Email/password authentication
  - Form validation
  - Error handling
  - Redirect to dashboard on success

- **Register Page** (`/register`)
  - User registration form
  - Password confirmation
  - Username/email validation
  - Auto-login after registration

### 2. Dashboard (`/dashboard`)
- **Profile Settings Tab**
  - Edit username and email
  - Update profile information
  - Save changes with validation

- **Change Password Tab**
  - Current password verification
  - New password with confirmation
  - Password strength validation

### 3. Marketplace (`/marketplace`)
- **Product Grid**
  - Responsive product cards
  - Product images, names, prices
  - Rating and review count
  - Add to cart functionality

- **Search & Filters**
  - Real-time search
  - Category filtering
  - Price range filtering
  - Sort by name, price, rating

### 4. Product Detail (`/product/:id`)
- **Product Information**
  - Large product images
  - Detailed description
  - Price and stock status
  - Product specifications

- **Reviews Section**
  - Customer reviews display
  - Rating breakdown
  - Add review functionality

- **Add to Cart**
  - Quantity selector
  - Stock validation
  - Buy now option

### 5. Shopping Cart (`/cart`)
- **Cart Items**
  - Product thumbnails
  - Item details and quantities
  - Price calculations
  - Remove items

- **Order Summary**
  - Subtotal calculation
  - Tax and shipping
  - Total amount
  - Checkout button

### 6. Purchase History (`/purchase-history`)
- **Order List**
  - Order numbers and dates
  - Order status tracking
  - Total amounts
  - View order details

- **Order Details Modal**
  - Complete order information
  - Itemized product list
  - Shipping address
  - Order status updates

### 7. Product Management (`/admin/products`) - Admin Only
- **Product Table**
  - All products with pagination
  - Search and filter options
  - Product status indicators

- **CRUD Operations**
  - Create new products
  - Edit existing products
  - Delete products
  - Bulk operations

## 🔐 User Roles

### Regular User
- Browse and search products
- Add items to cart
- Place orders
- Manage profile
- View order history
- Write product reviews

### Admin User
- All regular user features
- Manage products (CRUD)
- View all orders
- Update order status
- Manage users
- Access admin dashboard

## 🛡️ Security Features

### Frontend Security
- Protected routes with authentication
- Input validation and sanitization
- Secure token storage
- XSS protection

### Backend Security
- JWT authentication
- Password hashing with bcrypt
- Input validation with express-validator
- Rate limiting
- CORS configuration
- Helmet.js security headers

## 🎯 Key Features Implementation

### State Management
- **AuthContext**: User authentication state
- **CartContext**: Shopping cart state
- Local storage persistence
- Real-time updates

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interfaces
- Cross-browser compatibility

### Performance Optimization
- Lazy loading of components
- Image optimization
- Efficient API calls
- Caching strategies

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean
4. Set up CI/CD pipeline

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3
3. Configure environment variables
4. Set up custom domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

## 🔮 Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Email notifications
- Advanced search with filters
- Product recommendations
- Multi-language support
- Mobile app development
- Real-time chat support
- Advanced analytics dashboard
- Inventory management
- Coupon and discount system

---

**Built with ❤️ for the NMI Hackathon**