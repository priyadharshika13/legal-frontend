import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from '../pages/Landing/Landing';
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import CaseIntake from '../pages/CaseIntake/CaseIntake';
import Draft from '../pages/Draft/Draft';
import Judgments from '../pages/Judgments/Judgments';
import Register from '../pages/Auth/Register';

import { isLoggedIn } from '../store/auth';

function Private({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
      <Route path="/case-intake" element={<Private><CaseIntake /></Private>} />
      <Route path="/draft" element={<Private><Draft /></Private>} />
      <Route path="/judgments" element={<Private><Judgments /></Private>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
