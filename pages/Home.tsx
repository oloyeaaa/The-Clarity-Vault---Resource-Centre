
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RESOURCES } from '../lib/data';
import { ToolCard } from '../components/ToolCard';
import { useSEO } from '../lib/seo';

const Home: React.FC = () => {
  useSEO({ 
    title: 'Precision Automation Hub', 
    description: 'Vetted resources for marketing automation and AI strategy.' 
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(circle_at_center_right,rgba(219,127,32,0.1),transparent_70%)] -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col items-start gap-8 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20"
          >
            <ShieldCheck size={14} className="text-accent" />
            <span className="text-accent text-[10px] font-extrabold tracking-[0.2em] uppercase">Expert-Vetted Resources</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold leading-[1.1] max-w-4xl tracking-tight"
          >
            <span className="text-accent">TCV CLARITY:</span> <br />
            Modern Automation Tools for Industry Experts
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl font-light leading-relaxed"
          >
            The Clarity Vault (TCV) is the definitive directory of marketing automation platforms, AI tools, and performance resources curated for high-level strategists.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link to="/resources" className="bg-white text-background px-8 py-4 rounded-xl font-extrabold text-lg hover:bg-slate-100 transition-all flex items-center gap-2">
              Explore the Vault
              <ArrowRight size={20} />
            </Link>
            <button className="bg-accent/10 text-accent border border-accent/30 px-8 py-4 rounded-xl font-extrabold text-lg hover:bg-accent/20 transition-all">
              Join TCV Elite
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Resources Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold mb-2">Featured Vault Assets</h2>
            <p className="text-slate-500">Discover high-performance tools vetted by TCV analysts.</p>
          </div>
          <Link to="/resources" className="text-accent font-bold flex items-center gap-2 group">
            View All Resources
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {RESOURCES.slice(0, 6).map((res) => (
            <ToolCard key={res.id} resource={res} />
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent/5 border-y border-accent/10 py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(219,127,32,0.05),transparent_50%)]" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center justify-center size-16 bg-accent/10 rounded-2xl border border-accent/20 mb-2">
            <Mail className="text-accent" size={32} />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight">Access The Clarity Digest</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            Join 25,000+ industry experts. Every Tuesday, we send out 3 vetted tools, 2 automation workflows, and 1 case study.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4">
            <input 
              type="email" 
              placeholder="your.name@agency.com" 
              className="flex-1 bg-background border border-slate-800 rounded-xl px-6 py-4 focus:ring-1 focus:ring-accent focus:border-accent outline-none text-white transition-all placeholder-slate-600"
            />
            <button className="bg-accent text-white font-extrabold px-8 py-4 rounded-xl hover:bg-accent/90 transition-all shadow-xl shadow-accent/10 whitespace-nowrap">
              Unlock Access
            </button>
          </div>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.25em]">Private Directory • No Spam • Expert Content</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
