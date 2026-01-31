
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Zap, 
  Brain, 
  BarChart3, 
  Users, 
  Eye, 
  Layout, 
  ArrowRight,
  ShieldCheck,
  Mail,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';
import Home from './pages/Home';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import BlogList from './pages/BlogList';
import BlogPostDetail from './pages/BlogPostDetail';

// --- Shared Components ---

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/blog' },
    { name: 'Directory', path: '/resources?filter=all' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-accent/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-10 bg-background flex items-center justify-center rounded-full border border-accent/30 overflow-hidden">
            <span className="text-white font-extrabold text-sm tracking-tighter">
              T<span className="text-accent">C</span>V
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-extrabold tracking-tight text-white uppercase leading-none">
              The Clarity<span className="text-accent"> Vault</span>
            </h2>
            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold">Marketing Automation</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-sm font-semibold transition-colors hover:text-accent ${
                  location.pathname.startsWith(link.path) ? 'text-accent' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            <button className="bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-accent/20">
              Join TCV Elite
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-slate-300 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-surface border-b border-accent/10 lg:hidden p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-2"
                >
                  {link.name}
                </Link>
              ))}
              <button className="w-full bg-accent text-white py-4 rounded-xl font-bold">
                Join TCV Elite
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-background py-20 px-6 border-t border-slate-900">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <Link to="/" className="flex items-center gap-3 mb-8">
          <div className="size-10 bg-background flex items-center justify-center rounded-full border border-accent/30">
            <span className="text-white font-extrabold text-sm tracking-tighter">T<span className="text-accent">C</span>V</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-white uppercase">The Clarity<span className="text-accent"> Vault</span></h2>
        </Link>
        <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
          The premium destination for digital marketers and technical experts seeking the edge in automation, content performance, and ROI.
        </p>
        <div className="flex gap-4">
          {[Twitter, Linkedin, Github].map((Icon, i) => (
            <a key={i} href="#" className="size-10 bg-surface border border-slate-800 rounded-lg flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent/50 transition-all">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <div>
        <h5 className="font-bold text-accent mb-8 uppercase text-xs tracking-widest">Resources</h5>
        <ul className="space-y-4 text-sm text-slate-400">
          <li><Link to="/resources" className="hover:text-accent transition-colors">Vault Directory</Link></li>
          <li><a href="#" className="hover:text-accent transition-colors">Automation Guides</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Clarity Checklist</a></li>
        </ul>
      </div>
      <div>
        <h5 className="font-bold text-accent mb-8 uppercase text-xs tracking-widest">Enterprise</h5>
        <ul className="space-y-4 text-sm text-slate-400">
          <li><a href="#" className="hover:text-accent transition-colors">Agency Partners</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Priority Support</a></li>
          <li><Link to="/blog" className="hover:text-accent transition-colors">Expert Blog</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
      <p>© 2024 The Clarity Vault. Precision in every resource.</p>
      <div className="flex gap-8">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Cookies</a>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background text-slate-100 flex flex-col font-sans selection:bg-accent/30 selection:text-white">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<ResourceList />} />
            <Route path="/resources/:slug" element={<ResourceDetail />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
