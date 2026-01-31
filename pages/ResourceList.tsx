
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { RESOURCES } from '../lib/data';
import { ToolCard } from '../components/ToolCard';
import { useSEO } from '../lib/seo';

const ResourceList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

  useSEO({ 
    title: 'Vault Directory', 
    description: 'Explore our comprehensive directory of vetted marketing automation and AI tools.' 
  });

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
            className="w-full bg-surface border border-slate-800 rounded-xl pl-12 pr-4 py-4 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-white"
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
          <ToolCard key={res.id} resource={res} compact={true} />
        ))}
      </motion.div>

      {filteredResources.length === 0 && (
        <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl">
          <p className="text-slate-500 font-medium">No resources found matching this category.</p>
          <Link to="/resources" className="text-accent text-sm font-bold mt-4 inline-block hover:underline">
            Clear all filters
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResourceList;
