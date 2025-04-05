import fs from 'fs';
import path from "path";
import bcrypt from 'bcryptjs';
import { pool } from "../src/config/database.js";

(async () => {
  try {
    console.log("Starting data insertion...");
    
    const seedPath = path.join(process.cwd(), "scripts", "data", "seed.json");
    const jsonData = fs.readFileSync(seedPath, 'utf8');
    const data = JSON.parse(jsonData);
    
    await pool.query("BEGIN;");
    
    // Insert users
    const usersQuery = `
      INSERT INTO users (id, name, email, password) VALUES 
      ${await Promise.all(data.users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return `(${user.id}, '${user.name}', '${user.email}', '${hashedPassword}')`;
      })).then(results => results.join(', '))}
      ON CONFLICT (id) DO NOTHING;
    `;
    await pool.query(usersQuery);
    console.log("Users inserted.");
    
    // Insert balances
    const balancesQuery = `
      INSERT INTO balances (id, user_id, balance) VALUES 
      ${data.balances.map((balance) => `(${balance.id}, ${balance.user_id}, ${balance.balance})`).join(', ')}
      ON CONFLICT (id) DO NOTHING;
    `;
    await pool.query(balancesQuery);
    console.log("Balances inserted.");
    
    // Insert categories
    const categoriesQuery = `
      INSERT INTO categories (id, name, description) VALUES 
      ${data.categories.map((category) => `(${category.id}, '${category.name}', '${category.description}')`).join(', ')}
      ON CONFLICT (id) DO NOTHING;
    `;
    await pool.query(categoriesQuery);
    console.log("Categories inserted.");
    
    // Insert products
    const productsQuery = `
      INSERT INTO products (id, name, description, price, category_id) VALUES 
      ${data.products.map((product) => `(${product.id}, '${product.name}', '${product.description}', ${product.price}, ${product.category_id})`).join(', ')}
      ON CONFLICT (id) DO NOTHING;
    `;
    await pool.query(productsQuery);
    console.log("Products inserted.");
    
    // Insert orders
    const ordersQuery = `
      INSERT INTO orders (id, user_id, total, status, shipping_address, shipping_status) VALUES 
      ${data.orders.map((order) => `(${order.id}, ${order.user_id}, ${order.total}, '${order.status}', '${order.shipping_address}', '${order.shipping_status}')`).join(', ')}
      ON CONFLICT (id) DO NOTHING;
    `;
    await pool.query(ordersQuery);
    console.log("Orders inserted.");
    
    // Insert order items
    const ordersItemsQuery = `
      INSERT INTO orders_items (id, order_id, product_id, quantity) VALUES 
      ${data.orders_items.map((item) => `(${item.id}, ${item.order_id}, ${item.product_id}, ${item.quantity})`).join(', ')}
      ON CONFLICT (id) DO NOTHING;
    `;
    await pool.query(ordersItemsQuery);
    console.log("Orders items inserted.");
    
    // Insert cancellation requests
    const cancellationRequestsQuery = `
      INSERT INTO cancellation_requests (id, order_id, user_id, reason, status) VALUES 
      ${data.cancellation_requests.map((request) => `(${request.id}, ${request.order_id}, ${request.user_id}, '${request.reason}', '${request.status}')`).join(', ')}
      ON CONFLICT (id) DO NOTHING;
    `;
    await pool.query(cancellationRequestsQuery);
    console.log("Cancellation requests inserted.");
    
    // Insert carts
    const cartsQuery = `
      INSERT INTO carts (id, user_id, product_id, quantity) VALUES 
      ${data.carts.map((cart) => `(${cart.id}, ${cart.user_id}, ${cart.product_id}, ${cart.quantity})`).join(', ')}
      ON CONFLICT (id) DO NOTHING;
    `;
    await pool.query(cartsQuery);
    console.log("Carts inserted.");
    
    await pool.query("COMMIT;");
    console.log("Data insertion completed.");
  } catch (error) {
    await pool.query("ROLLBACK;");
    console.error("Error during data insertion:", error);
  } finally {
    process.exit(0);
  }
})();