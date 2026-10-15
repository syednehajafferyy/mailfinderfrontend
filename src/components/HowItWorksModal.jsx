import React from 'react';
import { X, CheckCircle, Shield, FileSpreadsheet, Globe, Download } from 'lucide-react';

export default function HowItWorksModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-navy-900 mb-2 flex items-center gap-2">
          <Globe className="w-6 h-6 text-blue-600" />
          How WebMail Finder Works
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Find publicly listed business contact emails directly from company websites without API fees or subscriptions.
        </p>

        <div className="space-y-4">
          <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <div>
              <h4 className="text-sm font-semibold text-navy-900">Upload Spreadsheet</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Upload your Excel (.xlsx) or CSV file with company websites. The app automatically detects your website column and previews rows.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <div>
              <h4 className="text-sm font-semibold text-navy-900">Polite & Smart Scanning</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                The scanner visits each website's homepage and crawls relevant pages (Contact, About, Support). It extracts publicly published emails and ranks general business inboxes (info@, contact@, hello@, sales@).
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div>
              <h4 className="text-sm font-semibold text-navy-900">Export Updated Excel</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Download your updated Excel file. The contact email and source link are inserted right beside your original website column, preserving all existing rows and data.
              </p>
            </div>
          </div>
        </div>

        {/* Guarantees */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Free to Use</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No Account or API Key</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-blue-600 shrink-0" />
            <span>SSRF & Network Safe</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Original Data Preserved</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition shadow-sm"
        >
          Got It, Let's Start
        </button>
      </div>
    </div>
  );
}
