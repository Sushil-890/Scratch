const express = require('express');
const router = express.Router();
const { createOrder } = require('../Controllers/PaymentControl');
const { authenticate } = require('../Middleware/AuthMiddleware');

router.post('/create-order', authenticate, createOrder);

module.exports = router;
