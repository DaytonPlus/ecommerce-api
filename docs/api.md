# 📚 API Documentation

## Introduction
Welcome to the E-commerce API documentation. This API allows you to manage products, orders, users, and more. The API is built with Node.js, Express, and PostgreSQL. Here, you'll find all the information you need to interact with the API.

## Base URL
```
https://your-api-domain.com/api
```

## Authentication
This API uses JSON Web Tokens (JWT) for authentication. You need to include the token in the `Authorization` header for all requests that require authentication.

Example:
```
Authorization: Bearer <your-token>
```

---

## Endpoints

### 1. Authentication
#### Register a new user
```
POST /auth/register
```
Request Body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
Response:
```json
{
  "token": "string"
}
```

#### Login a user
```
POST /auth/login
```
Request Body:
```json
{
  "email": "string",
  "password": "string"
}
```
Response:
```json
{
  "token": "string"
}
```

### 2. Users
#### Get current user
```
GET /users/me
```
Authentication required: Yes
Response:
```json
{
  "id": "number",
  "name": "string",
  "email": "string"
}
```

#### Create a user (Admin only)
```
POST /users
```
Authentication required: Admin
Request Body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
Response:
```json
{
  "id": "number",
  "name": "string",
  "email": "string"
}
```

#### Get all users (Admin only)
```
GET /users
```
Authentication required: Admin
Response:
```json
[
  {
    "id": "number",
    "name": "string",
    "email": "string"
  }
]
```

#### Get a user by ID (Admin only)
```
GET /users/:id
```
Authentication required: Admin
Response:
```json
{
  "id": "number",
  "name": "string",
  "email": "string"
}
```

#### Update a user (Admin only)
```
PUT /users/:id
```
Authentication required: Admin
Request Body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
Response:
```json
{
  "id": "number",
  "name": "string",
  "email": "string"
}
```

#### Delete a user (Admin only)
```
DELETE /users/:id
```
Authentication required: Admin
Response:
```json
{
  "message": "User deleted successfully"
}
```

### 3. Products
#### Get all products
```
GET /products
```
Response:
```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "category_id": "number"
  }
]
```

#### Get product by ID
```
GET /products/:id
```
Response:
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "category_id": "number"
}
```

#### Create a product (Admin only)
```
POST /products
```
Authentication required: Admin
Request Body:
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "category_id": "number"
}
```
Response:
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "category_id": "number"
}
```

#### Update a product (Admin only)
```
PUT /products/:id
```
Authentication required: Admin
Request Body:
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "category_id": "number"
}
```
Response:
```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "category_id": "number"
}
```

#### Delete a product (Admin only)
```
DELETE /products/:id
```
Authentication required: Admin
Response:
```json
{
  "message": "Product deleted successfully"
}
```

### 4. Categories
#### Get all categories
```
GET /categories
```
Response:
```json
[
  {
    "id": "number",
    "name": "string"
  }
]
```

#### Get category by ID
```
GET /categories/:id
```
Response:
```json
{
  "id": "number",
  "name": "string"
}
```

#### Create a category (Admin only)
```
POST /categories
```
Authentication required: Admin
Request Body:
```json
{
  "name": "string"
}
```
Response:
```json
{
  "id": "number",
  "name": "string"
}
```

#### Update a category (Admin only)
```
PUT /categories/:id
```
Authentication required: Admin
Request Body:
```json
{
  "name": "string"
}
```
Response:
```json
{
  "id": "number",
  "name": "string"
}
```

#### Delete a category (Admin only)
```
DELETE /categories/:id
```
Authentication required: Admin
Response:
```json
{
  "message": "Category deleted successfully"
}
```

### 5. Orders
#### Create an order
```
POST /orders
```
Authentication required: Yes
Request Body:
```json
{
  "total": "number",
  "shipping_address": "string",
  "status": "string",
  "shipping_status": "string"
}
```
Response:
```json
{
  "id": "number",
  "total": "number",
  "shipping_address": "string",
  "status": "string",
  "shipping_status": "string"
}
```

#### Get all orders (Admin only)
```
GET /orders
```
Authentication required: Admin
Response:
```json
[
  {
    "id": "number",
    "total": "number",
    "shipping_address": "string",
    "status": "string",
    "shipping_status": "string"
  }
]
```

#### Get order by ID (Admin only)
```
GET /orders/:id
```
Authentication required: Admin
Response:
```json
{
  "id": "number",
  "total": "number",
  "shipping_address": "string",
  "status": "string",
  "shipping_status": "string"
}
```

#### Get orders for current user
```
GET /orders/me
```
Authentication required: Yes
Response:
```json
[
  {
    "id": "number",
    "total": "number",
    "shipping_address": "string",
    "status": "string",
    "shipping_status": "string"
  }
]
```

#### Update an order (Admin only)
```
PUT /orders/:id
```
Authentication required: Admin
Request Body:
```json
{
  "total": "number",
  "shipping_address": "string",
  "status": "string",
  "shipping_status": "string"
}
```
Response:
```json
{
  "id": "number",
  "total": "number",
  "shipping_address": "string",
  "status": "string",
  "shipping_status": "string"
}
```

#### Delete an order (Admin only)
```
DELETE /orders/:id
```
Authentication required: Admin
Response:
```json
{
  "message": "Order deleted successfully"
}
```

#### Request order cancellation
```
POST /orders/cancel/:id
```
Authentication required: Yes
Request Body:
```json
{
  "reason": "string"
}
```
Response:
```json
{
  "message": "Cancel request registered"
}
```

### 6. Cart
#### Add item to cart
```
POST /cart/add
```
Authentication required: Yes
Request Body:
```json
{
  "productId": "number",
  "quantity": "number"
}
```
Response:
```json
{
  "message": "item_added_to_cart"
}
```

#### Get user cart items
```
GET /cart/user
```
Authentication required: Yes
Response:
```json
[
  {
    "productId": "number",
    "quantity": "number"
  }
]
```

#### Remove item from cart
```
DELETE /cart/user/remove/:itemId
```
Authentication required: Yes
Response:
```json
{
  "message": "item_removed_from_cart"
}
```

#### Delete user cart
```
DELETE /cart/user
```
Authentication required: Yes
Response:
```json
{
  "message": "cart_deleted_successfully"
}
```

#### Convert cart to order
```
POST /cart/user/checkout
```
Authentication required: Yes
Request Body:
```json
{
  "shipping_address": "string"
}
```
Response:
```json
{
  "id": "number",
  "total": "number",
  "shipping_address": "string",
  "status": "string",
  "shipping_status": "string"
}
```

---

## Error Handling
All error responses will follow this format:
```json
{
  "message": "Error message"
}
```

## Contact
For further information or questions, please contact [support@yourdomain.com](mailto:support@yourdomain.com).

---
**Note:** Replace `your-api-domain.com` with your actual API domain and update the contact email accordingly.
