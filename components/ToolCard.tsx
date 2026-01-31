
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Brain, Users, BarChart3, Eye, ArrowRight } from 'lucide-react';
import { Resource } from '../types';

interface ToolCardProps {
  resource: Resource;
  compact?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ resource, compact = false }) => {
  const IconMap: Record<string, React.ReactNode> = {
    'search': <ShieldCheck className="text-accent" />,
    'zap': <Zap className="text-accent" />,
    'brain': <Brain className="text-accent" />,
    'users': <Users className="text-accent" />,
    'bar-chart': <BarChart3 className="text-accent" />,
    'eye': <Eye className="text-accent" />
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`group bg-surface border border-accent/5 ${compact ? 'p-6' : 'p-8'} rounded-2xl hover:border-accent/40 transition-all flex flex-col h-full`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`bg-background border border-slate-800 rounded-xl flex items-center justify-center ${compact ? 'size-12 p-2.5' : 'size-14 p-3'}`}>
          {IconMap[resource.icon] || <Zap className="text-accent" />}
        </div>
        {resource.certified && (
          <span className="bg-accent/10 text-accent text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider border border-accent/20">
            TCV Certified
          </span>
        )}
      </div>
      <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-extrabold mb-3 group-hover:text-accent transition-colors`}>
        {resource.name}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
        {resource.description}
      </p>
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{resource.category}</span>
        <Link to={`/resources/${resource.slug}`} className="text-slate-600 group-hover:text-accent transition-all group-hover:translate-x-1">
          <ArrowRight size={compact ? 18 : 20} />
        </Link>
      </div>
    </motion.div>
  );
};
