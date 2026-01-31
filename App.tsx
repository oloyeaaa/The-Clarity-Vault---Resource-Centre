
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import BlogList from './pages/BlogList';
import BlogPostDetail from './pages/BlogPostDetail';
import Admin from './pages/Admin';

// This component helps handle cases where the user types /admin without the hash
const RouteCorrection = () => {
  const location = useLocation();
  useEffect(() => {
    // If we somehow got into the JS app without a hash but the path is /admin
    // (This usually only works if the server is configured to serve index.html for all paths)
    if (window.location.pathname.endsWith('/admin') && !window.location.hash) {
      window.location.replace(window.location.origin + '/#/admin');
    }
  }, [location]);
  return null;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <HashRouter>
        <RouteCorrection />
        <Routes>
          {/* Admin area: prioritized at the top of the stack */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Public Website Routes */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/resources" element={<MainLayout><ResourceList /></MainLayout>} />
          <Route path="/resources/:slug" element={<MainLayout><ResourceDetail /></MainLayout>} />
          <Route path="/blog" element={<MainLayout><BlogList /></MainLayout>} />
          <Route path="/blog/:slug" element={<MainLayout><BlogPostDetail /></MainLayout>} />
          
          {/* Catch-all redirect to ensure "Page not available" is replaced by Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </HelmetProvider>
  );
};

export default App;
