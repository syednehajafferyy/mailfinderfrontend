import React from 'react';
import { Mail, HelpCircle, RefreshCw } from 'lucide-react';

export default function Header({ onOpenHowItWorks, onReset, isScanning }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-navy-900">WebMail</span>
              <span className="text-xl font-semibold tracking-tight text-blue-600">Finder</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                100% Free
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Bulk Public Business Email Discovery</p>
          </div>
        </div>

        {/* Action Navigation */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenHowItWorks}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
            id="how-it-works-btn"
          >
            <HelpCircle className="w-4 h-4" />
            <span>How It Works</span>
          </button>

          {isScanning && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition border border-slate-200"
              title="Start a new upload"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">New Scan</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
