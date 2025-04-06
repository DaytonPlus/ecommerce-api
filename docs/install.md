# 📦 Installation Guide

## Introduction
This document provides a step-by-step guide to installing and setting up the E-commerce API on your local machine. Follow these instructions to get the API up and running.

## Prerequisites
Before you begin, make sure you have the following software installed on your system:

- ![Node.js](https://img.shields.io/badge/Node.js-16.x-green) **Node.js** (version 16.x or higher)
- ![npm](https://img.shields.io/badge/npm-7.x-red) **npm** (Node Package Manager)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13.x-blue) **PostgreSQL** (version 13.x or higher)
- ![Git](https://img.shields.io/badge/Git-2.x-yellow) **Git** (optional, for cloning the repository)

## Step-by-Step Installation

### 1. Clone the Repository
Clone the repository to your local machine using Git.
```bash
git clone https://github.com/DaytonPlus/ecommerce-api.git
cd ecommerce-api
```

### 2. Install Dependencies
Install the required npm packages.
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following environment variables:
```env
DB_USER=your_username
DB_HOST=localhost
DB_NAME=ecommerce
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
API_PORT=8000
```
> **Note:** Replace `your_username`, `your_password`, and `your_jwt_secret_key` with your actual PostgreSQL username, password, and a secret key for JWT.

### 4. Set Up the Database
Make sure PostgreSQL is running and create a new database.
```bash
psql -U your_username -c "CREATE DATABASE ecommerce;"
```

### 5. Run Migrations
Run the database migrations to set up the schema.
```bash
npm run db:migrate
```

### 6. Seed the Database (Optional)
If you have seed data, you can populate the database with initial data.
```bash
npm run db:seed
```

### 7. Start the Server
Start the application server.
```bash
npm run dev
```
> **Note:** The server should now be running on `http://localhost:8000`.

## Running Tests
To run the tests, use the following command:
```bash
npm run test
```

## Troubleshooting
If you encounter any issues during the installation, check the following:

- Make sure PostgreSQL is running and the database credentials in the `.env` file are correct.
- Ensure all required npm packages are installed by running `npm install`.
- Check if the `.env` file is correctly set up with all necessary environment variables.

## Contact
For further assistance, please contact [daytonprogrammer@gmail.com](mailto:daytonprogrammer@gmail.com).
