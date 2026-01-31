
import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import BlogList from './pages/BlogList';
import BlogPostDetail from './pages/BlogPostDetail';

/**
 * Environment detection to handle the AI Studio preview environment and localhost.
 * AI Studio and some preview containers require HashRouter to function correctly,
 * while production benefits from BrowserRouter for SEO-friendly URLs.
 */
const isDevelopment = 
  window.location.hostname.includes('google.com') || 
  window.location.hostname === 'localhost' ||
  window.location.hostname.includes('googleusercontent.com');

const Router = isDevelopment ? HashRouter : BrowserRouter;

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<ResourceList />} />
            <Route path="/resources/:slug" element={<ResourceDetail />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            {/* Fallback for invalid routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </HelmetProvider>
  );
};

export default App;
