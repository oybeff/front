// src/components/ModeratorDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModeratorDashboard = () => {

    const [catalog, setCatalog] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', price: 0, composition: '', size: '', image: '' });

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

    const handleAddItem = async () => {
        try {
            await axios.post('/api/catalog', newItem);
            fetchCatalog();
            setNewItem({ name: '', price: 0, composition: '', size: '', image: '' });
        } catch (error) {
            console.error("Error adding item", error);
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await axios.delete(`/api/catalog/${id}`);
            fetchCatalog();
        } catch (error) {
            console.error("Error deleting item", error);
        }
    };

    return (
        <div>
            <h2>Moderator Dashboard</h2>
            <div>
                <input type="text" placeholder="Name" onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                <input type="number" placeholder="Price" onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
                <button onClick={handleAddItem}>Add Item</button>
            </div>
            <ul>
                {catalog.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default ModeratorDashboard;
