
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import BlogList from './pages/BlogList';
import BlogPostDetail from './pages/BlogPostDetail';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <HashRouter>
        <Routes>
          {/* Admin area is handled separately to avoid MainLayout wrap */}
          <Route path="/admin" element={<Admin />} />
          
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/resources" element={<MainLayout><ResourceList /></MainLayout>} />
          <Route path="/resources/:slug" element={<MainLayout><ResourceDetail /></MainLayout>} />
          <Route path="/blog" element={<MainLayout><BlogList /></MainLayout>} />
          <Route path="/blog/:slug" element={<MainLayout><BlogPostDetail /></MainLayout>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </HelmetProvider>
  );
};

export default App;
