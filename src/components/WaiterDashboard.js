// src/components/WaiterDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WaiterDashboard = () => {
    const [catalog, setCatalog] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchCatalog();
    }, []);

    const fetchCatalog = async () => {
        try {
            const response = await axios.get('/api/catalog');
            setCatalog(response.data);
        } catch (error) {
            console.error("Error fetching catalog", error);
        }
    };

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const createOrder = async () => {
        try {
            await axios.post('/api/orders', { items: cart });
            setCart([]); // clear cart after creating order
        } catch (error) {
            console.error("Error creating order", error);
        }
    };

    return (
        <div>
            <h2>Waiter Dashboard</h2>
            <ul>
                {catalog.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <button onClick={createOrder}>Place Order</button>
        </div>
    );
};

export default WaiterDashboard;
