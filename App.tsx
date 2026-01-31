
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import BlogList from './pages/BlogList';
import BlogPostDetail from './pages/BlogPostDetail';

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<ResourceList />} />
          <Route path="/resources/:slug" element={<ResourceDetail />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
