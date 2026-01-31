
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  // Added RefreshCw to imports to fix error on line 100
  RefreshCw
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

  // Auto-generate slug from title if it's a new post and slug is empty
  useEffect(() => {
    if (!initialPost.airtableId && post.title && !post.slug) {
      const generated = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setPost(prev => ({ ...prev, slug: generated }));
    }
  }, [post.title]);

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
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleSaveInternal = async () => {
    setIsSaving(true);
    await onSave(post);
    setIsSaving(false);
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
            className="flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-accent/90 shadow-lg shadow-accent/20 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
            {isSaving ? 'Syncing...' : 'Sync to Vault'}
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
            className="flex-grow bg-background text-slate-300 p-8 md:p-12 outline-none resize-none font-mono text-base leading-relaxed custom-scrollbar"
          />
        </div>

        {/* Live Preview */}
        {(preview || true) && (
          <div className={`w-full md:w-1/2 border-l border-slate-800 overflow-y-auto bg-background p-8 md:p-16 custom-scrollbar ${!preview && 'hidden md:block'}`}>
            <div className="max-w-prose mx-auto">
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-6 block border-b border-accent/20 pb-2">Vault Blueprint Preview</span>
              <h1 className="text-4xl md:text-5xl font-black mb-8 text-white leading-tight">{post.title || 'Insight Title'}</h1>
              
              {post.coverImage && (
                <div className="rounded-2xl overflow-hidden mb-10 border border-slate-800 aspect-video shadow-2xl">
                  <img src={post.coverImage} className="w-full h-full object-cover" alt="Cover" />
                </div>
              )}

              <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-400 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-black prose-strong:text-accent">
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content
                    .split('\n')
                    .map(line => {
                      if (line.startsWith('###')) return `<h3 class="text-xl font-black mt-8 mb-4 text-white">${line.replace('###', '')}</h3>`;
                      if (line.startsWith('##')) return `<h2 class="text-2xl font-black mt-10 mb-6 text-white border-b border-slate-800 pb-2">${line.replace('##', '')}</h2>`;
                      if (line.startsWith('>')) return `<blockquote class="border-l-4 border-accent pl-6 italic text-slate-300 my-8">${line.replace('>', '')}</blockquote>`;
                      if (line.trim() === '') return '<br/>';
                      return `<p class="mb-4 text-slate-400">${line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent">$1</strong>')}</p>`;
                    }).join('') }} 
                  />
                ) : (
                  <p className="text-slate-600 italic font-light">Content blueprint will manifest here...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Metadata Sidebar */}
        <aside className="w-80 border-l border-slate-800 bg-surface flex flex-col overflow-y-auto hidden xl:flex">
          <div className="p-8 space-y-8">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800 pb-4">Configuration</h4>
            
            <div className="space-y-6">
              {[
                { label: 'Asset Title', key: 'title', type: 'text' },
                { label: 'URL Path (Slug)', key: 'slug', type: 'text' },
                { label: 'Blueprint Excerpt', key: 'excerpt', type: 'textarea' },
              ].map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="block text-[9px] font-black text-accent uppercase tracking-widest">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea 
                      value={(post as any)[field.key] || ''}
                      onChange={(e) => setPost({...post, [field.key]: e.target.value})}
                      rows={3}
                      className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white resize-none"
                    />
                  ) : (
                    <input 
                      type="text" 
                      value={(post as any)[field.key] || ''}
                      onChange={(e) => setPost({...post, [field.key]: e.target.value})}
                      className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white font-bold"
                    />
                  )}
                </div>
              ))}

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
                <label className="block text-[9px] font-black text-accent uppercase tracking-widest">Feature Image URL</label>
                <input 
                  type="text" 
                  value={post.coverImage || ''}
                  onChange={(e) => setPost({...post, coverImage: e.target.value})}
                  className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white mb-2"
                />
                {post.coverImage && (
                  <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-800">
                    <img src={post.coverImage} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
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
