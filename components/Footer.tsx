
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Lock } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="bg-background py-20 px-6 border-t border-slate-900">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <Link to="/" className="flex items-center gap-3 mb-8">
          <div className="size-10 bg-background flex items-center justify-center rounded-full border border-accent/30">
            <span className="text-white font-extrabold text-sm tracking-tighter">T<span className="text-accent">C</span>V</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-white uppercase">The Clarity<span className="text-accent"> Vault</span></h2>
        </Link>
        <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
          The premium destination for digital marketers and technical experts seeking the edge in automation, content performance, and ROI.
        </p>
        <div className="flex gap-4">
          {[Twitter, Linkedin, Github].map((Icon, i) => (
            <a key={i} href="#" className="size-10 bg-surface border border-slate-800 rounded-lg flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent/50 transition-all">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <div>
        <h5 className="font-bold text-accent mb-8 uppercase text-xs tracking-widest">Resources</h5>
        <ul className="space-y-4 text-sm text-slate-400">
          <li><Link to="/resources" className="hover:text-accent transition-colors">Vault Directory</Link></li>
          <li><a href="#" className="hover:text-accent transition-colors">Automation Guides</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Clarity Checklist</a></li>
        </ul>
      </div>
      <div>
        <h5 className="font-bold text-accent mb-8 uppercase text-xs tracking-widest">Enterprise</h5>
        <ul className="space-y-4 text-sm text-slate-400">
          <li><a href="#" className="hover:text-accent transition-colors">Agency Partners</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Priority Support</a></li>
          <li><Link to="/blog" className="hover:text-accent transition-colors">Expert Blog</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
      <div className="flex items-center gap-4">
        <p>© 2024 The Clarity Vault. Precision in every resource.</p>
        <Link to="/admin" className="text-slate-800 hover:text-accent flex items-center gap-1 transition-colors">
          <Lock size={10} /> Admin
        </Link>
      </div>
      <div className="flex gap-8">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Cookies</a>
      </div>
    </div>
  </footer>
);
