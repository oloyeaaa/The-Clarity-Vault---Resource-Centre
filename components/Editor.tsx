
import React, { useState, useEffect, useRef } from 'react';
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
  AlertCircle,
  Lock
} from 'lucide-react';
import { BlogPost } from '../types';

interface EditorProps {
  post: Partial<BlogPost>;
  onSave: (post: Partial<BlogPost>) => void;
  onClose: () => void;
}

export const Editor: React.FC<EditorProps> = ({ post: initialPost, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<BlogPost>>(initialPost);
  const [preview, setPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isDirty, setIsDirty] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check for Airtable system configuration
  // Fixed: Using process.env instead of import.meta.env for platform environment access
  const isConfigMissing = !process.env.VITE_AIRTABLE_TOKEN || !process.env.VITE_AIRTABLE_BASE_ID;

  // Auto-generate slug from title
  useEffect(() => {
    if (!initialPost.airtableId && formData.title && !formData.slug) {
      const generated = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug: generated }));
    }
    setIsDirty(JSON.stringify(formData) !== JSON.stringify(initialPost));
  }, [formData.title, formData]);

  // Draft Protection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && syncStatus !== 'success') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, syncStatus]);

  const handleClose = () => {
    if (isDirty && syncStatus !== 'success') {
      if (window.confirm('You have unsaved changes. Are you sure you want to exit?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const beforeSelection = text.substring(0, start);
    const selected = text.substring(start, end);
    const afterSelection = text.substring(end);
    
    const newContent = beforeSelection + before + selected + after + afterSelection;
    setFormData({ ...formData, content: newContent });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length, 
        end + before.length
      );
    }, 0);
  };

  const handleSync = async () => {
    if (isConfigMissing) return;
    
    if (!formData.title || !formData.slug) {
      alert('Asset Title and Slug are mandatory for sync.');
      return;
    }
    
    setIsSaving(true);
    setSyncStatus('idle');
    try {
      await onSave(formData);
      setSyncStatus('success');
      setIsDirty(false);
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (e) {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const renderPreviewContent = (content: string = '') => {
    if (!content) return '<p class="text-slate-600 italic">Content blueprint will manifest here...</p>';
    return content
      .split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('###')) return `<h3 class="text-xl font-black mt-8 mb-4 text-white">${trimmed.replace('###', '')}</h3>`;
        if (trimmed.startsWith('##')) return `<h2 class="text-2xl font-black mt-10 mb-6 text-white border-b border-slate-800 pb-2">${trimmed.replace('##', '')}</h2>`;
        if (trimmed.startsWith('#')) return `<h1 class="text-3xl font-black mt-12 mb-8 text-white">${trimmed.replace('#', '')}</h1>`;
        if (trimmed.startsWith('>')) return `<blockquote class="border-l-4 border-accent pl-6 italic text-slate-300 my-8 bg-accent/5 py-4 rounded-r-xl">${trimmed.replace('>', '')}</blockquote>`;
        if (trimmed.startsWith('- ')) return `<li class="ml-6 list-disc mb-2 text-slate-400">${trimmed.replace('- ', '')}</li>`;
        if (trimmed.startsWith('```')) return `<pre class="bg-slate-900 border border-slate-800 p-4 rounded-xl font-mono text-sm my-6 text-accent overflow-x-auto">${trimmed.replace(/```/g, '')}</pre>`;
        if (trimmed === '') return '<div class="h-4"></div>';
        
        let parsed = trimmed
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent font-bold">$1</strong>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-accent underline hover:text-white transition-colors">$1</a>')
          .replace(/`(.*?)`/g, '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-accent font-mono text-xs">$1</code>');
        
        return `<p class="mb-4 text-slate-400 leading-relaxed">${parsed}</p>`;
      }).join('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[100] bg-background flex flex-col font-sans"
    >
      <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-surface/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={handleClose} className="p-2.5 hover:bg-slate-800 rounded-xl text-slate-400 transition-all active:scale-90">
            <X size={20} />
          </button>
          <div className="h-6 w-px bg-slate-800 mx-1" />
          <div className="flex flex-col">
            <h2 className="font-black text-xs uppercase tracking-widest text-white truncate max-w-xs md:max-w-md">
              {formData.title || 'Untitled Blueprint'}
            </h2>
            {isDirty && <span className="text-[8px] text-accent uppercase font-black tracking-widest">Unsaved Changes</span>}
          </div>
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
          <div className="relative group">
            <button 
              onClick={handleSync}
              disabled={isSaving || isConfigMissing}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                syncStatus === 'success' ? 'bg-green-600 text-white' : 
                syncStatus === 'error' ? 'bg-red-600 text-white' : 
                'bg-accent text-white hover:bg-accent/90 shadow-accent/20'
              }`}
            >
              {isConfigMissing ? <Lock size={16} /> : isSaving ? <RefreshCw size={16} className="animate-spin" /> : 
               syncStatus === 'success' ? <CheckCircle size={16} /> :
               syncStatus === 'error' ? <AlertCircle size={16} /> :
               <Send size={16} />}
              {isConfigMissing ? 'Config Missing' : isSaving ? 'Syncing...' : 
               syncStatus === 'success' ? 'Synced!' :
               syncStatus === 'error' ? 'Failed' :
               'Sync to Vault'}
            </button>
            {isConfigMissing && (
              <div className="absolute top-full mt-2 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                System Configuration Missing
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden">
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
            ref={textareaRef}
            id="content-area"
            value={formData.content || ''}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Document the expert strategy..."
            className="flex-grow bg-background text-slate-300 p-8 md:p-12 outline-none resize-none font-mono text-base leading-relaxed custom-scrollbar selection:bg-accent/20"
          />
        </div>

        <div className={`w-full md:w-1/2 border-l border-slate-800 overflow-y-auto bg-background p-8 md:p-16 custom-scrollbar ${!preview && 'hidden md:block'}`}>
          <div className="max-w-prose mx-auto">
            <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-6 block border-b border-accent/20 pb-2">Vault Blueprint Preview</span>
            <h1 className="text-4xl md:text-5xl font-black mb-8 text-white leading-tight">{formData.title || 'Insight Title'}</h1>
            <div className="prose prose-invert prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: renderPreviewContent(formData.content) }} />
            </div>
          </div>
        </div>

        <aside className="w-80 border-l border-slate-800 bg-surface flex flex-col overflow-y-auto hidden lg:flex">
          <div className="p-8 space-y-8">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800 pb-4">Configuration</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[9px] font-black text-accent uppercase tracking-widest">Asset Title</label>
                <input 
                  type="text" 
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white font-bold transition-all"
                  placeholder="The Future of SEO..."
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[9px] font-black text-accent uppercase tracking-widest">URL Path (Slug)</label>
                <input 
                  type="text" 
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                  className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white font-mono transition-all"
                  placeholder="seo-future-2024"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[9px] font-black text-accent uppercase tracking-widest">Visibility Status</label>
                <select 
                  value={formData.status || 'Draft'}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white font-bold appearance-none cursor-pointer"
                >
                  <option value="Draft">Drafting Phase</option>
                  <option value="Published">Live Blueprint</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[9px] font-black text-accent uppercase tracking-widest">Category</label>
                <select 
                  value={formData.category || 'Strategy'}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-background border border-slate-800 rounded-xl p-3 text-xs focus:border-accent outline-none text-white font-bold appearance-none cursor-pointer"
                >
                  <option value="Strategy">Strategy</option>
                  <option value="AI Strategy">AI Strategy</option>
                  <option value="SEO Performance">SEO Performance</option>
                  <option value="Marketing Automation">Marketing Automation</option>
                </select>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};
