
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ShieldCheck, Zap, Brain, Users, BarChart3, Eye, ArrowRight } from 'lucide-react';
import { RESOURCES } from '../lib/data';

const ResourceList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

  const categories = [
    'all',
    'Marketing Automation',
    'AI Strategy',
    'SEO Performance',
    'Growth Data',
    'Content Systems',
    'Intelligence'
  ];

  const filteredResources = RESOURCES.filter(res => 
    filter === 'all' || res.category === filter
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-16">
        <h1 className="text-4xl font-extrabold mb-4">Vault Directory</h1>
        <p className="text-slate-400 max-w-2xl">The most comprehensive, expert-vetted directory of technical marketing solutions on the web.</p>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="Search the vault for expert marketing tools..."
            className="w-full bg-surface border border-slate-800 rounded-xl pl-12 pr-4 py-4 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/resources?filter=${cat}`}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${
                filter === cat 
                  ? 'bg-accent border-accent text-white' 
                  : 'bg-surface border-slate-800 text-slate-400 hover:border-slate-600'
              }`}
            >
              {cat === 'all' ? 'All Resources' : cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredResources.map((res) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={res.id}
            className="group bg-surface border border-accent/5 p-6 rounded-2xl hover:border-accent/40 transition-all flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="size-12 bg-background border border-slate-800 rounded-lg flex items-center justify-center p-2.5">
                {res.icon === 'search' && <ShieldCheck className="text-accent" />}
                {res.icon === 'zap' && <Zap className="text-accent" />}
                {res.icon === 'brain' && <Brain className="text-accent" />}
                {res.icon === 'users' && <Users className="text-accent" />}
                {res.icon === 'bar-chart' && <BarChart3 className="text-accent" />}
                {res.icon === 'eye' && <Eye className="text-accent" />}
              </div>
              {res.certified && (
                <div className="bg-accent/10 text-accent text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-accent/20">
                  Certified
                </div>
              )}
            </div>
            <h3 className="text-lg font-extrabold mb-2 group-hover:text-accent transition-colors">{res.name}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 flex-grow">
              {res.description}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{res.category}</span>
              <Link to={`/resources/${res.slug}`} className="text-slate-600 group-hover:text-accent transition-all group-hover:translate-x-1">
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredResources.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500">No resources found matching this category.</p>
        </div>
      )}
    </div>
  );
};

export default ResourceList;
