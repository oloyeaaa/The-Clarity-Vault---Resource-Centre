
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, FileText, Bold, Heading2, Heading3, List, Link as LinkIcon, Image as ImageIcon, X, Send } from 'lucide-react';
import { BlogPost } from '../types';

interface EditorProps {
  post: Partial<BlogPost>;
  onSave: (post: Partial<BlogPost>) => void;
  onClose: () => void;
}

export const Editor: React.FC<EditorProps> = ({ post: initialPost, onSave, onClose }) => {
  const [post, setPost] = useState<Partial<BlogPost>>(initialPost);
  const [preview, setPreview] = useState(false);

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
    
    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col">
      {/* Editor Header */}
      <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-surface">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
            <X size={20} />
          </button>
          <div className="h-6 w-px bg-slate-800" />
          <h2 className="font-bold text-sm truncate max-w-md">
            {post.title || 'Untitled Post'}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setPreview(!preview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${preview ? 'bg-accent text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            {preview ? <FileText size={16} /> : <Eye size={16} />}
            {preview ? 'Edit Mode' : 'Live Preview'}
          </button>
          <button 
            onClick={() => onSave(post)}
            className="flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-lg text-sm font-bold hover:bg-accent/90 shadow-lg shadow-accent/20"
          >
            <Send size={16} />
            Save & Sync
          </button>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden">
        {/* Main Editor Area */}
        <div className={`flex-grow flex flex-col ${preview ? 'hidden md:flex' : 'flex'}`}>
          {/* Toolbar */}
          <div className="h-12 border-b border-slate-800 px-4 flex items-center gap-2 bg-surface-light/30">
            <button onClick={() => insertText('## ', '')} className="p-2 hover:bg-slate-800 text-slate-400 rounded" title="Heading 2"><Heading2 size={18} /></button>
            <button onClick={() => insertText('### ', '')} className="p-2 hover:bg-slate-800 text-slate-400 rounded" title="Heading 3"><Heading3 size={18} /></button>
            <button onClick={() => insertText('**', '**')} className="p-2 hover:bg-slate-800 text-slate-400 rounded" title="Bold"><Bold size={18} /></button>
            <button onClick={() => insertText('- ', '')} className="p-2 hover:bg-slate-800 text-slate-400 rounded" title="List"><List size={18} /></button>
            <button onClick={() => insertText('[', '](url)')} className="p-2 hover:bg-slate-800 text-slate-400 rounded" title="Link"><LinkIcon size={18} /></button>
            <button onClick={() => insertText('![alt](', ')') } className="p-2 hover:bg-slate-800 text-slate-400 rounded" title="Image"><ImageIcon size={18} /></button>
          </div>
          
          <textarea
            id="content-area"
            value={post.content || ''}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder="Start writing expert insights..."
            className="flex-grow bg-background text-slate-300 p-8 outline-none resize-none font-mono text-base leading-relaxed"
          />
        </div>

        {/* Live Preview Pane */}
        {(preview || true) && (
          <div className={`w-full md:w-1/2 border-l border-slate-800 overflow-y-auto bg-background p-12 custom-scrollbar ${!preview && 'hidden md:block'}`}>
            <div className="max-w-prose mx-auto">
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.25em] mb-4 block">PREVIEW MODE</span>
              <h1 className="text-4xl font-extrabold mb-8 text-white">{post.title || 'Post Title'}</h1>
              <div className="prose prose-invert prose-lg max-w-none">
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content.split('\n').map(p => p.startsWith('##') ? `<h2 class="text-2xl font-bold mt-8 mb-4 text-white">${p.replace('##', '')}</h2>` : `<p class="mb-4 text-slate-400">${p}</p>`).join('') }} />
                ) : (
                  <p className="text-slate-600 italic">Content preview will appear here...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Metadata Sidebar */}
        <aside className="w-80 border-l border-slate-800 bg-surface flex flex-col overflow-y-auto hidden xl:flex">
          <div className="p-6 space-y-8">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Metadata</h4>
            
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-accent uppercase tracking-widest">Post Title</label>
              <input 
                type="text" 
                value={post.title || ''}
                onChange={(e) => setPost({...post, title: e.target.value})}
                className="w-full bg-background border border-slate-800 rounded-lg p-3 text-sm focus:border-accent outline-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-accent uppercase tracking-widest">URL Slug</label>
              <input 
                type="text" 
                value={post.slug || ''}
                onChange={(e) => setPost({...post, slug: e.target.value})}
                className="w-full bg-background border border-slate-800 rounded-lg p-3 text-sm focus:border-accent outline-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-accent uppercase tracking-widest">Status</label>
              <select 
                value={post.status || 'Draft'}
                onChange={(e) => setPost({...post, status: e.target.value as any})}
                className="w-full bg-background border border-slate-800 rounded-lg p-3 text-sm focus:border-accent outline-none"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-accent uppercase tracking-widest">Category</label>
              <input 
                type="text" 
                value={post.category || ''}
                onChange={(e) => setPost({...post, category: e.target.value})}
                className="w-full bg-background border border-slate-800 rounded-lg p-3 text-sm focus:border-accent outline-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-accent uppercase tracking-widest">Feature Image URL</label>
              <input 
                type="text" 
                value={post.coverImage || ''}
                onChange={(e) => setPost({...post, coverImage: e.target.value})}
                className="w-full bg-background border border-slate-800 rounded-lg p-3 text-sm focus:border-accent outline-none"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
