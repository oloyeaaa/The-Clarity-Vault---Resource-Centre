
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../lib/data';

const BlogList: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-20">
        <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-6">
          <span className="text-accent text-[10px] font-black uppercase tracking-widest">The Clarity Digest</span>
        </div>
        <h1 className="text-5xl font-extrabold mb-6">Expert Insights & Blueprints</h1>
        <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
          Deep dives into marketing automation strategy, data engineering, and the technical edge of modern performance marketing.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {BLOG_POSTS.map((post) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group flex flex-col h-full"
          >
            <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden rounded-3xl aspect-[16/9] mb-8 border border-slate-800 group-hover:border-accent/30 transition-all">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6">
                <span className="px-3 py-1 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded">
                  {post.category}
                </span>
              </div>
            </Link>
            
            <div className="flex items-center gap-4 mb-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-accent" />
                {post.date}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-accent" />
                {post.readTime}
              </div>
            </div>

            <Link to={`/blog/${post.slug}`}>
              <h2 className="text-3xl font-extrabold mb-4 group-hover:text-accent transition-colors leading-tight">
                {post.title}
              </h2>
            </Link>

            <p className="text-slate-400 mb-8 flex-grow leading-relaxed font-light">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-slate-900 mt-auto">
              <div className="flex items-center gap-3">
                <img src={post.author.avatar} alt={post.author.name} className="size-10 rounded-full border border-slate-800" />
                <div>
                  <p className="text-sm font-bold text-white leading-none mb-1">{post.author.name}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{post.author.role}</p>
                </div>
              </div>
              <Link to={`/blog/${post.slug}`} className="text-slate-500 group-hover:text-accent transition-all flex items-center gap-2 font-bold text-sm">
                Read Blueprint
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
