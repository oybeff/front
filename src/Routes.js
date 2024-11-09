// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModeratorDashboard from './components/ModeratorDashboard';
import WaiterDashboard from './components/WaiterDashboard';
import ChefDashboard from './components/ChefDashboard';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/moderator" element={<ModeratorDashboard />} />
                <Route path="/waiter" element={<WaiterDashboard />} />
                <Route path="/chef" element={<ChefDashboard />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
