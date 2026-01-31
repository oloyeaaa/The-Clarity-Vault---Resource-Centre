
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
