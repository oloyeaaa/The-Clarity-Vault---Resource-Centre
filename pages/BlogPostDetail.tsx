
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, Clock, Share2, Bookmark } from 'lucide-react';
import { BLOG_POSTS } from '../lib/data';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-accent">Back to Blog</Link>
      </div>
    );
  }

  // Set document title for "SEO"
  React.useEffect(() => {
    document.title = `${post.title} | The Clarity Vault`;
  }, [post]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 font-bold text-sm">
        <ChevronLeft size={16} />
        Back to Blog
      </Link>

      <article>
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-accent" />
              {post.date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-accent" />
              {post.readTime}
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-12 tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-between border-y border-slate-900 py-8">
            <div className="flex items-center gap-4">
              <img src={post.author.avatar} alt={post.author.name} className="size-14 rounded-full border border-slate-800" />
              <div>
                <p className="text-lg font-bold text-white leading-none mb-1">{post.author.name}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{post.author.role}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="size-12 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent/30 transition-all">
                <Share2 size={20} />
              </button>
              <button className="size-12 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent/30 transition-all">
                <Bookmark size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="rounded-3xl overflow-hidden aspect-video mb-16 border border-slate-900 shadow-2xl">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <section className="prose prose-invert prose-lg max-w-none prose-p:text-slate-400 prose-p:leading-relaxed prose-p:font-light prose-headings:font-extrabold prose-headings:text-white prose-strong:text-accent prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
          <p className="text-xl italic border-l-4 border-accent pl-8 mb-12 text-white font-medium">
            "{post.excerpt}"
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.content.split('\n').map(p => `<p>${p}</p>`).join('') }} />
          
          <h2 className="mt-16 mb-8 text-3xl">Implementation Roadmap</h2>
          <p>
            When deploying these automation assets, the critical failure point is usually <strong>data parity</strong>. Ensure your CRM fields map exactly to your enrichment source before pushing the "live" button on your Make.com scenarios.
          </p>
          <ul>
            <li>Step 1: Audit your current manual workflow duration.</li>
            <li>Step 2: Map the logic into a visual workflow builder.</li>
            <li>Step 3: Test with a small batch (10-20 leads).</li>
            <li>Step 4: Scale to full production once edge cases are resolved.</li>
          </ul>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-900">
           <div className="bg-surface border border-slate-800 p-10 rounded-3xl text-center">
              <h4 className="text-2xl font-extrabold mb-4">Want more blueprints like this?</h4>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto font-light">
                Join the Clarity Digest and get technical teardowns sent directly to your inbox every Tuesday morning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="name@agency.com" 
                  className="flex-1 bg-background border border-slate-700 rounded-xl px-6 py-4 outline-none focus:border-accent transition-all"
                />
                <button className="bg-accent text-white px-8 py-4 rounded-xl font-extrabold whitespace-nowrap">
                  Subscribe
                </button>
              </div>
           </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogPostDetail;
