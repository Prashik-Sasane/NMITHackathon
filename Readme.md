#NMITHACKATHON
# Frontend - Marketplace React App

This is the frontend for the Marketplace application, built with **React** and **Vite**. It provides a modern, responsive user interface for browsing products, managing a shopping cart, user authentication, purchase history, and product management (admin).

---

## Features

- **User Authentication**: Register, login, and logout functionality.
- **Marketplace**: Browse products, filter by category, search, sort, and view product details.
- **Shopping Cart**: Add, remove, and update product quantities in the cart.
- **Checkout**: Simulated checkout process with order summary and purchase history.
- **Purchase History**: View past orders and order details.
- **Profile Dashboard**: Update user profile and change password.
- **Product Management (Admin)**: Add, edit, and delete products (UI only, no backend).
- **Responsive Design**: Works well on desktop and mobile devices.

---

## How the App Works

### 1. **Marketplace**
- Users can browse all available products.
- Products can be filtered by category, searched by name/description, and sorted by name or price.
- Clicking on a product shows detailed information, images, reviews, and allows adding to cart.

### 2. **Cart & Checkout**
- The cart icon in the navbar shows the number of items in the cart.
- Users can view their cart, update quantities, or remove items.
- Proceeding to checkout simulates an order and moves items to purchase history.

### 3. **Authentication**
- Users must register and log in to access the dashboard, purchase history, and product management.
- Authentication state is stored in `localStorage` for persistence.

### 4. **Purchase History**
- After checkout, orders are saved and shown in the purchase history page.
- Users can view details of each order, including items, quantities, and totals.

### 5. **Profile Dashboard**
- Users can update their profile information and change their password.

### 6. **Product Management (Admin)**
- Admins can add, edit, or delete products from the catalog.
- All product data changes are local to the browser (no backend).

---

## Data Storage

- **Products**: Loaded from a mock data file (`src/data/mockProducts.js`). Any changes (add/edit/delete) are kept in React state and do **not** persist after a page reload.
- **Cart**: Stored in `localStorage` under the key `cart` for persistence across sessions.
- **Purchase History**: Stored in `localStorage` under the key `purchaseHistory`.
- **User Authentication**: User info is stored in `localStorage` under the key `user`.

---

## Tech Stack

- **React** (with hooks and context API)
- **Vite** (for fast development)
- **Lucide-react** (for icons)
- **CSS Modules** (for component-level styling)
- **No backend/API**: All data is local and simulated.

---

## Running the App

1. **Install dependencies:**
   ```sh
   npm install