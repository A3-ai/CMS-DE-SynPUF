import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Dashboard from './features/dashboard/pages/Dashboard';
import RfpList from './features/rfp/pages/RfpList';
import RfpCreate from './features/rfp/pages/RfpCreate';
import RfpDetail from './features/rfp/pages/RfpDetail';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="rfps"
            element={
              <PrivateRoute>
                <RfpList />
              </PrivateRoute>
            }
          />
          <Route
            path="rfps/new"
            element={
              <PrivateRoute>
                <RfpCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="rfps/:id"
            element={
              <PrivateRoute>
                <RfpDetail />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
