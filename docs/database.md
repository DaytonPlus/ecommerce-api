# 📊 Database Documentation

## Introduction
This document provides a comprehensive overview of the database schema used in the E-commerce API. The database is built using PostgreSQL and includes tables for managing users, products, orders, categories, cart items, and more. This guide will help you understand the structure and relationships between different entities in the database.

## Database Schema

### Tables

#### 1. Users
This table stores user information.

| Column         | Type         | Constraints            |
|----------------|--------------|------------------------|
| id             | SERIAL       | PRIMARY KEY            |
| name           | VARCHAR(255) | NOT NULL               |
| email          | VARCHAR(255) | NOT NULL, UNIQUE       |
| password       | VARCHAR(255) | NOT NULL               |
| created_at     | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

#### 2. Products
This table stores product details.

| Column         | Type         | Constraints            |
|----------------|--------------|------------------------|
| id             | SERIAL       | PRIMARY KEY            |
| name           | VARCHAR(255) | NOT NULL               |
| description    | TEXT         |                        |
| price          | DECIMAL(10, 2)| NOT NULL              |
| stock          | INTEGER      | NOT NULL               |
| category_id    | INTEGER      | FOREIGN KEY REFERENCES categories(id) |
| created_at     | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

#### 3. Orders
This table stores order details.

| Column         | Type         | Constraints            |
|----------------|--------------|------------------------|
| id             | SERIAL       | PRIMARY KEY            |
| user_id        | INTEGER      | FOREIGN KEY REFERENCES users(id) |
| total          | DECIMAL(10, 2)| NOT NULL              |
| shipping_address | VARCHAR(255)| NOT NULL              |
| status         | VARCHAR(50)  | DEFAULT 'pending'      |
| shipping_status| VARCHAR(50)  | DEFAULT 'pending'      |
| created_at     | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

#### 4. Categories
This table stores product categories.

| Column         | Type         | Constraints            |
|----------------|--------------|------------------------|
| id             | SERIAL       | PRIMARY KEY            |
| name           | VARCHAR(255) | NOT NULL               |
| created_at     | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

#### 5. Cart Items
This table stores items added to the user's cart.

| Column         | Type         | Constraints            |
|----------------|--------------|------------------------|
| id             | SERIAL       | PRIMARY KEY            |
| user_id        | INTEGER      | FOREIGN KEY REFERENCES users(id) |
| product_id     | INTEGER      | FOREIGN KEY REFERENCES products(id) |
| quantity       | INTEGER      | NOT NULL               |
| created_at     | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

#### 6. Balance
This table stores user balance information.

| Column         | Type         | Constraints            |
|----------------|--------------|------------------------|
| id             | SERIAL       | PRIMARY KEY            |
| user_id        | INTEGER      | FOREIGN KEY REFERENCES users(id) |
| balance        | DECIMAL(10, 2)| NOT NULL              |
| created_at     | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

#### 7. Cancellation Requests
This table stores order cancellation requests.

| Column         | Type         | Constraints            |
|----------------|--------------|------------------------|
| id             | SERIAL       | PRIMARY KEY            |
| order_id       | INTEGER      | FOREIGN KEY REFERENCES orders(id) |
| user_id        | INTEGER      | FOREIGN KEY REFERENCES users(id) |
| reason         | TEXT         |                        |
| status         | VARCHAR(50)  | DEFAULT 'pending'      |
| created_at     | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

## Relationships

- **Users**: A user can have multiple orders, cart items, and balance records.
- **Products**: A product belongs to a category and can have multiple cart items and orders.
- **Orders**: An order belongs to a user and can have multiple cancellation requests.
- **Categories**: A category can have multiple products.
- **Cart Items**: A cart item belongs to a user and a product.
- **Balance**: A balance record belongs to a user.
- **Cancellation Requests**: A cancellation request belongs to an order and a user.

## ER Diagram
Below is the Entity-Relationship (ER) diagram representing the database schema.

![ER Diagram](./ecommerce-api-database-der.png)

## Contact
For further information or questions, please contact [support@yourdomain.com](mailto:support@yourdomain.com).

---
**Note:** Replace `link-to-your-er-diagram-image` with the actual link to your ER diagram image and update the contact email accordingly.
