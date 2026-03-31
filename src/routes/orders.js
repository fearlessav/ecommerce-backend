// src/routes/orders.js

const express = require('express');
const router = express.Router();

let orders = []; // This will store orders in memory for demo purposes. In production, use a database.

// Endpoint to create a new order
router.post('/orders', (req, res) => {
    const { userId, items } = req.body;
    if (!userId || !items || items.length === 0) {
        return res.status(400).json({ message: 'User ID and items are required.' });
    }
    const orderId = orders.length + 1;
    const newOrder = { orderId, userId, items, status: 'pending', createdAt: new Date() };
    orders.push(newOrder);
    return res.status(201).json(newOrder);
});

// Endpoint to view order history for a user
router.get('/orders/history/:userId', (req, res) => {
    const userId = req.params.userId;
    const userOrders = orders.filter(order => order.userId === userId);
    return res.status(200).json(userOrders);
});

// Endpoint to update the status of an order
router.patch('/orders/:orderId/status', (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const { status } = req.body;
    const order = orders.find(o => o.orderId === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }
    order.status = status;
    return res.status(200).json(order);
});

module.exports = router;