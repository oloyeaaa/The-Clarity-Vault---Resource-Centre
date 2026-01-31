
import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import BlogList from './pages/BlogList';
import BlogPostDetail from './pages/BlogPostDetail';
import Admin from './pages/Admin';

const isDevelopment = 
  window.location.hostname.includes('google.com') || 
  window.location.hostname === 'localhost' ||
  window.location.hostname.includes('googleusercontent.com');

const Router = isDevelopment ? HashRouter : BrowserRouter;

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Admin area is handled separately to avoid MainLayout wrap if desired, 
              or kept simple for consistent branding */}
          <Route path="/admin" element={<Admin />} />
          
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/resources" element={<MainLayout><ResourceList /></MainLayout>} />
          <Route path="/resources/:slug" element={<MainLayout><ResourceDetail /></MainLayout>} />
          <Route path="/blog" element={<MainLayout><BlogList /></MainLayout>} />
          <Route path="/blog/:slug" element={<MainLayout><BlogPostDetail /></MainLayout>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
