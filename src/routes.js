const express = require('express');
// const langRoutes = require('./routes/lang.routes');
const authRoutes = require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');
const userRoutes = require('./routes/user.routes');
const ordersRoutes = require('./routes/order.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes.js');
const balanceRoutes = require('./routes/balance.routes.js');
const cancellation_requestsRoutes = require('./routes/cancellation_requests.routes.js');
const router = express.Router();

// router.use('/api/lang', langRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/cart', cartRoutes);
router.use('/api/users', userRoutes);
router.use('/api/order', ordersRoutes);
router.use('/api/product', productRoutes);
router.use('/api/category', categoryRoutes);
router.use('/api/balance', balanceRoutes);
router.use('/api/cancellation_request', cancellation_requestsRoutes);

module.exports = router;