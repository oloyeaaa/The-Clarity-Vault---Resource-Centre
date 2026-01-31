
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ExternalLink, ShieldCheck, Zap, Brain, Users, BarChart3, Eye, Check } from 'lucide-react';
import { RESOURCES } from '../lib/data';
import { useSEO } from '../lib/seo';

const ResourceDetail: React.FC = () => {
  const { slug } = useParams();
  const resource = RESOURCES.find(r => r.slug === slug);

  useSEO({ 
    title: resource ? resource.name : 'Resource Not Found',
    description: resource ? resource.description : undefined
  });

  if (!resource) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Resource not found</h1>
        <Link to="/resources" className="text-accent font-bold hover:underline">Back to Directory</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/resources" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 font-bold text-sm group">
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Directory
      </Link>

      <article className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
            <div className="size-24 bg-surface border border-slate-800 rounded-2xl flex items-center justify-center p-6 shrink-0 shadow-2xl">
                {resource.icon === 'search' && <ShieldCheck className="text-accent" size={40} />}
                {resource.icon === 'zap' && <Zap className="text-accent" size={40} />}
                {resource.icon === 'brain' && <Brain className="text-accent" size={40} />}
                {resource.icon === 'users' && <Users className="text-accent" size={40} />}
                {resource.icon === 'bar-chart' && <BarChart3 className="text-accent" size={40} />}
                {resource.icon === 'eye' && <Eye className="text-accent" size={40} />}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-extrabold">{resource.name}</h1>
                {resource.certified && (
                  <div className="bg-accent/10 text-accent text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-accent/20 flex items-center gap-1">
                    <Check size={10} /> Certified
                  </div>
                )}
              </div>
              <p className="text-xl text-slate-400 font-light leading-relaxed">{resource.description}</p>
            </div>
          </div>

          <section className="prose prose-invert max-w-none">
            <h3 className="text-2xl font-bold mb-6">Expert Analysis</h3>
            <p className="text-slate-300 leading-relaxed mb-8 text-lg">
              {resource.longDescription}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-surface/50 border border-slate-800 p-6 rounded-2xl">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-accent">
                  <ShieldCheck size={18} /> Why we recommend it
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Used by 80% of top-tier growth agencies for baseline analysis. Its API depth and historical data accuracy are unmatched in the current market.
                </p>
              </div>
              <div className="bg-surface/50 border border-slate-800 p-6 rounded-2xl">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-accent">
                  <Zap size={18} /> Best Use Case
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Perfect for enterprise-level domain audits and competitor monitoring where high precision is non-negotiable for ROI calculations.
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-surface border border-slate-800 rounded-3xl p-8 sticky top-32">
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-500 mb-8">Asset Details</h4>
            
            <div className="space-y-6 mb-10">
              <div>
                <span className="text-[10px] font-black uppercase text-accent block mb-1">Category</span>
                <span className="text-sm font-bold">{resource.category}</span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-accent block mb-1">Tags</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {resource.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-background border border-slate-800 rounded text-[10px] font-bold text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-accent text-white py-4 rounded-xl font-extrabold flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-xl shadow-accent/20"
            >
              Visit Platform
              <ExternalLink size={18} />
            </a>

            <div className="mt-8 pt-8 border-t border-slate-800">
              <p className="text-[10px] text-slate-500 text-center leading-relaxed font-medium">
                Disclosure: We may receive compensation if you purchase through our links. This does not affect our vetting process.
              </p>
            </div>
          </div>
        </aside>
      </article>
    </div>
  );
};

export default ResourceDetail;
