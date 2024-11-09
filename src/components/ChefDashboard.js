// src/components/ChefDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChefDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };

    const markAsDone = async (orderId) => {
        try {
            await axios.put(`/api/orders/${orderId}`, { status: 'DONE' });
            fetchOrders(); // refresh orders list
        } catch (error) {
            console.error("Error updating order", error);
        }
    };

    return (
        <div>
            <h2>Chef Dashboard</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Order #{order.id} - Status: {order.status}
                        <button onClick={() => markAsDone(order.id)}>Mark as Done</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChefDashboard;
