
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  RefreshCw, 
  LogOut, 
  Search, 
  Filter, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Layers,
  AlertTriangle
} from 'lucide-react';
import { fetchPosts, savePost } from '../lib/airtable';
import { BlogPost } from '../types';
import { Editor } from '../components/Editor';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [filter, setFilter] = useState<'All' | 'Published' | 'Draft'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'assets'>('dashboard');

  useEffect(() => {
    const saved = localStorage.getItem('tcv_admin_session');
    if (saved === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const accessKey = 'clarity2024';
    if (password === accessKey) {
      setIsAuthenticated(true);
      localStorage.setItem('tcv_admin_session', 'true');
      setError(null);
    } else {
      setError('Invalid Vault Access Key');
    }
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchPosts();
      setPosts(data || []);
    } catch (err) {
      setError('Failed to connect to Airtable. Using local data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedPost: Partial<BlogPost>) => {
    const success = await savePost(updatedPost, !updatedPost.airtableId);
    if (success) {
      setEditingPost(null);
      loadPosts();
    } else {
      alert('Sync failed. Please check your API configuration or network.');
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'All' || post.status === filter;
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'Published').length,
    drafts: posts.filter(p => p.status === 'Draft').length,
  };

  const createNewPost = () => {
    setEditingPost({
      title: '',
      content: '',
      slug: '',
      status: 'Draft',
      category: 'Strategy',
      author: { name: 'Marcus Thorne', avatar: 'https://picsum.photos/seed/marcus/100/100', role: 'Founder' },
      date: new Date().toISOString().split('T')[0]
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-surface border border-slate-800 p-10 rounded-3xl shadow-2xl text-center"
        >
          <div className="size-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-accent/20">
            <ShieldAlert className="text-accent" size={32} />
          </div>
          <h1 className="text-2xl font-extrabold mb-2 uppercase tracking-tight text-white">The Clarity Vault</h1>
          <p className="text-slate-500 text-sm mb-8 font-medium">Restricted Expert CMS Access</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Vault Access Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full bg-background border border-slate-800 rounded-xl px-6 py-4 outline-none focus:border-accent transition-all text-center tracking-widest font-black text-white"
            />
            {error && (
              <div className="flex items-center justify-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                <AlertTriangle size={12} /> {error}
              </div>
            )}
            <button className="w-full bg-accent text-white py-4 rounded-xl font-extrabold hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 active:scale-95">
              Unlock Dashboard
            </button>
          </form>
          <p className="mt-8 text-[10px] text-slate-600 uppercase font-black tracking-widest">
            Level 4 Encryption Active
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-background border-r border-slate-800 flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-background flex items-center justify-center rounded-lg border border-accent/30 overflow-hidden shadow-lg shadow-accent/5">
              <span className="text-white font-black text-[10px]">T<span className="text-accent">C</span>V</span>
            </div>
            <h2 className="text-xs font-black uppercase tracking-widest text-white">Expert Control</h2>
          </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-1.5 pt-8">
          <button 
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeView === 'dashboard' ? 'bg-accent/10 text-accent' : 'text-slate-400 hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveView('assets')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeView === 'assets' ? 'bg-accent/10 text-accent' : 'text-slate-400 hover:bg-slate-800/50'
            }`}
          >
            <FileText size={18} /> Asset Manager
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-xl font-bold text-sm transition-all">
            <Layers size={18} /> Categories
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
      <main className="flex-grow flex flex-col min-w-0">
        <header className="h-20 border-b border-slate-800 px-8 flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-white">
              {activeView === 'dashboard' ? 'Expert Insights' : 'Asset Manager'}
            </h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Airtable Content Sync Active</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={loadPosts}
              className="p-2.5 bg-surface-light/50 text-slate-400 hover:text-accent border border-slate-800 rounded-xl transition-all"
              title="Refresh Data"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button 
              onClick={createNewPost}
              className="bg-accent text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-accent/90 shadow-lg shadow-accent/20 active:scale-95 transition-all"
            >
              <Plus size={18} /> New Blueprint
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Total Assets', value: stats.total, icon: Layers, color: 'text-white' },
              { label: 'Live Blueprints', value: stats.published, icon: CheckCircle2, color: 'text-green-500' },
              { label: 'Drafting Phase', value: stats.drafts, icon: Clock, color: 'text-yellow-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-surface border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`${stat.color} opacity-20`} size={32} />
              </div>
            ))}
          </div>

          <AnimatePresence mode='wait'>
            {activeView === 'dashboard' ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-surface border border-slate-800 p-8 rounded-3xl">
                  <h3 className="text-xl font-black mb-6 text-white">Recent Activity</h3>
                  <div className="space-y-4">
                    {posts.slice(0, 5).map(post => (
                      <div key={post.id} className="flex items-center justify-between p-4 bg-background/50 border border-slate-800/50 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className={`size-2 rounded-full ${post.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          <div>
                            <p className="font-bold text-sm text-white">{post.title}</p>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{post.category} • {post.date}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setEditingPost(post)}
                          className="text-xs font-bold text-accent hover:underline"
                        >
                          Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="assets"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* List Controls */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface/30 p-4 rounded-2xl border border-slate-800">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search vaults..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-background border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:border-accent transition-all text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2 p-1 bg-background border border-slate-800 rounded-xl">
                    {['All', 'Published', 'Draft'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilter(s as any)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          filter === s ? 'bg-accent text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div className="bg-surface border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                  {loading && !posts.length ? (
                    <div className="h-64 flex flex-col items-center justify-center gap-4">
                      <RefreshCw size={32} className="text-accent animate-spin" />
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Querying Airtable...</p>
                    </div>
                  ) : filteredPosts.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center p-8">
                      <FileText size={40} className="text-slate-700 mb-4" />
                      <h3 className="text-lg font-bold text-slate-400 mb-2">No Blueprints Found</h3>
                      <p className="text-sm text-slate-600 max-w-xs">Adjust your filters or create a new expert resource to populate the vault.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-900/50 border-b border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <th className="px-8 py-6">Resource Title</th>
                            <th className="px-8 py-6">Category</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6">Sync Date</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                          {filteredPosts.map((post) => (
                            <tr key={post.id} className="hover:bg-slate-800/30 transition-all group">
                              <td className="px-8 py-6">
                                <div className="flex flex-col">
                                  <span className="font-bold text-slate-100 mb-1 group-hover:text-accent transition-colors leading-tight">{post.title}</span>
                                  <span className="text-[10px] text-slate-600 font-black tracking-widest uppercase">/{post.slug}</span>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <span className="text-xs font-bold text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-md">{post.category}</span>
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
                                <div className="flex items-center justify-end gap-3">
                                  <button 
                                    onClick={() => setEditingPost(post)}
                                    className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all border-b border-transparent hover:border-white pb-0.5"
                                  >
                                    Edit
                                  </button>
                                  <a 
                                    href={`#/blog/${post.slug}`} 
                                    target="_blank" 
                                    className="size-8 flex items-center justify-center bg-background border border-slate-800 rounded-lg text-slate-500 hover:text-accent hover:border-accent/30 transition-all"
                                  >
                                    <ExternalLink size={14} />
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
              </motion.div>
            )}
          </AnimatePresence>
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
