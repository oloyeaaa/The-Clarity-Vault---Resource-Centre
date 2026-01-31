
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FileText, Plus, RefreshCw, LogOut, ChevronRight, Settings, ExternalLink, ShieldAlert } from 'lucide-react';
import { fetchPosts, savePost } from '../lib/airtable';
import { BlogPost } from '../types';
import { Editor } from '../components/Editor';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [view, setView] = useState<'list' | 'editor'>('list');

  useEffect(() => {
    const saved = localStorage.getItem('tcv_admin_session');
    if (saved === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadPosts();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'clarity2024') { // Simple gate as requested
      setIsAuthenticated(true);
      localStorage.setItem('tcv_admin_session', 'true');
    } else {
      alert('Invalid Access Key');
    }
  };

  const loadPosts = async () => {
    setLoading(true);
    const data = await fetchPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleSave = async (updatedPost: Partial<BlogPost>) => {
    const success = await savePost(updatedPost, !updatedPost.airtableId);
    if (success) {
      alert('Post synchronized with Airtable');
      setEditingPost(null);
      loadPosts();
    } else {
      alert('Sync failed. Check console for details.');
    }
  };

  const handleCreateNew = () => {
    setEditingPost({
      title: '',
      content: '',
      slug: '',
      status: 'Draft',
      category: 'Strategy',
      author: {
        name: 'Marcus Thorne',
        avatar: 'https://picsum.photos/seed/marcus/100/100',
        role: 'Founder'
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-surface border border-slate-800 p-10 rounded-3xl shadow-2xl text-center"
        >
          <div className="size-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-accent/20">
            <ShieldAlert className="text-accent" size={32} />
          </div>
          <h1 className="text-2xl font-extrabold mb-2 uppercase tracking-tight">The Clarity Vault</h1>
          <p className="text-slate-500 text-sm mb-8 font-medium">Restricted Expert CMS Access</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Vault Access Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-slate-800 rounded-xl px-6 py-4 outline-none focus:border-accent transition-all text-center tracking-widest font-black"
            />
            <button className="w-full bg-accent text-white py-4 rounded-xl font-extrabold hover:bg-accent/90 transition-all shadow-xl shadow-accent/20">
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-background border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-background flex items-center justify-center rounded-full border border-accent/30 overflow-hidden">
              <span className="text-white font-extrabold text-[10px]">T<span className="text-accent">C</span>V</span>
            </div>
            <h2 className="text-xs font-black uppercase tracking-widest">Admin Control</h2>
          </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-2 pt-8">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-accent/10 text-accent rounded-xl font-bold text-sm">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl font-bold text-sm transition-all">
            <FileText size={18} /> Blog Posts
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl font-bold text-sm transition-all">
            <Settings size={18} /> Settings
          </button>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <button 
            onClick={() => {
              localStorage.removeItem('tcv_admin_session');
              setIsAuthenticated(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400 font-bold text-sm transition-all"
          >
            <LogOut size={18} /> Exit Vault
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <header className="h-20 border-b border-slate-800 px-8 flex items-center justify-between">
          <h1 className="text-xl font-extrabold">Asset Management</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={loadPosts}
              className="p-2 text-slate-400 hover:text-accent transition-all"
              title="Refresh Data"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <button 
              onClick={handleCreateNew}
              className="bg-accent text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-accent/90 shadow-lg shadow-accent/20"
            >
              <Plus size={18} /> New Expert Blueprint
            </button>
          </div>
        </header>

        <div className="p-10 overflow-y-auto">
          {loading && !posts.length ? (
            <div className="h-64 flex items-center justify-center">
              <RefreshCw size={32} className="text-accent animate-spin" />
            </div>
          ) : (
            <div className="bg-surface border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <th className="px-8 py-6">Title & Blueprint</th>
                    <th className="px-8 py-6">Category</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6">Date</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-800/30 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-100 mb-1 group-hover:text-accent transition-colors">{post.title}</span>
                          <span className="text-[10px] text-slate-500 font-medium">/{post.slug}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-slate-400">{post.category}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                          post.status === 'Published' 
                            ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                            : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs text-slate-500 font-medium">{post.date}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setEditingPost(post)}
                            className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all"
                          >
                            Edit
                          </button>
                          <a 
                            href={`/blog/${post.slug}`} 
                            target="_blank" 
                            className="p-2 hover:bg-slate-700 rounded-lg text-slate-500 hover:text-accent transition-all"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {editingPost && (
          <Editor 
            post={editingPost} 
            onSave={handleSave} 
            onClose={() => setEditingPost(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
