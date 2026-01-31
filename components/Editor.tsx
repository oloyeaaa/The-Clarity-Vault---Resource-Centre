
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  FileText, 
  Bold, 
  Heading2, 
  Heading3, 
  List, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  X, 
  Send,
  Code,
  Quote,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { BlogPost } from '../types';

interface EditorProps {
  post: Partial<BlogPost>;
  onSave: (post: Partial<BlogPost>) => void;
  onClose: () => void;
}

export const Editor: React.FC<EditorProps> = ({ post: initialPost, onSave, onClose }) => {
  const [post, setPost] = useState<Partial<BlogPost>>(initialPost);
  const [preview, setPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Auto-generate slug from title if it's a new post and slug is empty
  useEffect(() => {
    if (!initialPost.airtableId && post.title && !post.slug) {
      const generated = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setPost(prev => ({ ...prev, slug: generated }));
    }
  }, [post.title, initialPost.airtableId]);

  const insertText = (before: string, after: string = '') => {
    const textarea = document.getElementById('content-area') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const beforeSelection = text.substring(0, start);
    const selected = text.substring(start, end);
    const afterSelection = text.substring(end);
    
    const newContent = beforeSelection + before + selected + after + afterSelection;
    setPost({ ...post, content: newContent });
    
    // Maintain focus and set selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length, 
        end + before.length
      );
    }, 0);
  };

  const handleSaveInternal = async () => {
    if (!post.title || !post.slug) {
      alert('Asset Title and Slug are mandatory.');
      return;
    }
    
    setIsSaving(true);
    setSyncStatus('idle');
    try {
      await onSave(post);
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (e) {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const renderMarkdown = (content: string = '') => {
    if (!content) return '<p class="text-slate-600 italic">Content blueprint will manifest here...</p>';
    
    // Basic markdown conversion logic
    return content
      .split('\n')
      .map(line => {
        if (line.startsWith('###')) return `<h3 class="text-xl font-black mt-8 mb-4 text-white">${line.replace('###', '')}</h3>`;
        if (line.startsWith('##')) return `<h2 class="text-2xl font-black mt-10 mb-6 text-white border-b border-slate-800 pb-2">${line.replace('##', '')}</h2>`;
        if (line.startsWith('#')) return `<h1 class="text-3xl font-black mt-12 mb-8 text-white">${line.replace('#', '')}</h1>`;
        if (line.startsWith('>')) return `<blockquote class="border-l-4 border-accent pl-6 italic text-slate-300 my-8 bg-accent/5 py-4 rounded-r-xl">${line.replace('>', '')}</blockquote>`;
        if (line.startsWith('- ')) return `<li class="ml-6 list-disc mb-2 text-slate-400">${line.replace('- ', '')}</li>`;
        if (line.startsWith('```')) return `<pre class="bg-slate-900 border border-slate-800 p-4 rounded-xl font-mono text-sm my-6 text-accent overflow-x-auto">${line.replace(/```/g, '')}</pre>`;
        if (line.trim() === '') return '<div class="h-4"></div>';
        
        return `<p class="mb-4 text-slate-400 leading-relaxed">${line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent">$1</strong>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-accent underline hover:text-white transition-colors">$1</a>')
          .replace(/`(.*?)`/g, '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-accent font-mono text-xs">$1</code>')
        }</p>`;
      }).join('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[100] bg-background flex flex-col font-sans"
    >
      {/* Editor Header */}
      <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-surface/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2.5 hover:bg-slate-800 rounded-xl text-slate-400 transition-all active:scale-90">
            <X size={20} />
          </button>
          <div className="h-6 w-px bg-slate-800 mx-1" />
          <h2 className="font-black text-xs uppercase tracking-widest text-white truncate max-w-md">
            {post.title || 'Untitled Blueprint'}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setPreview(!preview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              preview ? 'bg-accent text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {preview ? <FileText size={16} /> : <Eye size={16} />}
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button 
            onClick={handleSaveInternal}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50 ${
              syncStatus === 'success' ? 'bg-green-600 text-white' : 
              syncStatus === 'error' ? 'bg-red-600 text-white' : 
              'bg-accent text-white hover:bg-accent/90 shadow-accent/20'
            }`}
          >
            {isSaving ? <RefreshCw size={16} className="animate-spin" /> : 
             syncStatus === 'success' ? <CheckCircle size={16} /> :
             syncStatus === 'error' ? <AlertCircle size={16} /> :
             <Send size={16} />}
            {isSaving ? 'Syncing...' : 
             syncStatus === 'success' ? 'Synced!' :
             syncStatus === 'error' ? 'Failed' :
             'Sync to Vault'}
          </button>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden">
        {/* Editor Area */}
        <div className={`flex-grow flex flex-col ${preview ? 'hidden md:flex' : 'flex'}`}>
          <div className="h-12 border-b border-slate-800 px-4 flex items-center gap-1 bg-surface-light/20">
            {[
              { icon: Heading2, label: 'H2', action: () => insertText('## ', '\n') },
              { icon: Heading3, label: 'H3', action: () => insertText('### ', '\n') },
              { icon: Bold, label: 'Bold', action: () => insertText('**', '**') },
              { icon: List, label: 'List', action: () => insertText('- ', '') },
              { icon: Quote, label: 'Quote', action: () => insertText('> ', '') },
              { icon: Code, label: 'Code', action: () => insertText('```\n', '\n```') },
              { icon: LinkIcon, label: 'Link', action: () => insertText('[', '](url)') },
              { icon: ImageIcon, label: 'Image', action: () => insertText('![alt](', ')') },
            ].map((btn, i) => (
              <button 
                key={i} 
                onClick={btn.action} 
                className="p-2 hover:bg-slate-800 text-slate-500 hover:text-accent rounded-lg transition-all" 
                title={btn.label}
              >
                <btn.icon size={16} />
              </button>
            ))}
          </div>
          
          <textarea
            id="content-area"
            value={post.content || ''}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder="Document the expert strategy..."
            className="flex-grow bg-background text-slate-300 p-8 md:p-12 outline-none resize-none font-mono text-base leading-relaxed custom-scrollbar selection:bg-accent/20"
          />
        </div>

        {/* Live Preview */}
        {(preview || true) && (
          <div className={`w-full md:w-1/2 border-l border-slate-800 overflow-y-auto bg-background p-8 md:p-16 custom-scrollbar ${!preview && 'hidden md:block'}`}>
            <div className="max-w-prose mx-auto">
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-6 block border-b border-accent/20 pb-2">Vault Blueprint Preview</span>
              <h1 className="text-4xl md:text-5xl font-black mb-8 text-white leading-tight">{post.title || 'Insight Title'}</h1>
              
              <AnimatePresence>
                {post.coverImage && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl overflow-hidden mb-10 border border-slate-800 aspect-video shadow-2xl"
                  >
                    <img src={post.coverImage} className="w-full h-full object-cover" alt="Cover" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="prose prose-invert prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
              </div>
            </div>
          </div>
        )}

        {/* Metadata Sidebar (Configuration Panel) */}
        <aside className="w-80 border-l border-slate-800 bg-surface flex flex-col overflow-y-auto hidden xl:flex">
          <div className="p-8 space-y-8">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800 pb-4">Configuration</h4>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[9px] font-black text-accent uppercase tracking-widest">Asset Title</label>
                <input 
                  type="text" 
                  value={post.title || ''}
                  onChange={(e) => setPost({...post, title: e.target.value})}
                  className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white font-bold transition-all"
                  placeholder="The Future of SEO..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] font-black text-accent uppercase tracking-widest">URL Path (Slug)</label>
                <input 
                  type="text" 
                  value={post.slug || ''}
                  onChange={(e) => setPost({...post, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                  className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white font-mono transition-all"
                  placeholder="seo-future-2024"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] font-black text-accent uppercase tracking-widest">Blueprint Excerpt</label>
                <textarea 
                  value={post.excerpt || ''}
                  onChange={(e) => setPost({...post, excerpt: e.target.value})}
                  rows={3}
                  className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white resize-none transition-all"
                  placeholder="Summary of the blueprint..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] font-black text-accent uppercase tracking-widest">Visibility Status</label>
                <select 
                  value={post.status || 'Draft'}
                  onChange={(e) => setPost({...post, status: e.target.value as any})}
                  className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white font-bold appearance-none cursor-pointer"
                >
                  <option value="Draft">Drafting Phase</option>
                  <option value="Published">Live Blueprint</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] font-black text-accent uppercase tracking-widest">Category</label>
                <select 
                  value={post.category || 'Strategy'}
                  onChange={(e) => setPost({...post, category: e.target.value})}
                  className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white font-bold appearance-none cursor-pointer"
                >
                  <option value="Strategy">Strategy</option>
                  <option value="AI Strategy">AI Strategy</option>
                  <option value="SEO Performance">SEO Performance</option>
                  <option value="Marketing Automation">Marketing Automation</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] font-black text-accent uppercase tracking-widest">Feature Image URL</label>
                <input 
                  type="text" 
                  value={post.coverImage || ''}
                  onChange={(e) => setPost({...post, coverImage: e.target.value})}
                  className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white mb-2 transition-all"
                  placeholder="https://..."
                />
                {post.coverImage && (
                  <div className="aspect-[16/9] rounded-lg overflow-hidden border border-slate-800 bg-background flex items-center justify-center">
                    <img src={post.coverImage} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};
