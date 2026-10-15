import React, { useState, useRef } from 'react';
import { UploadCloud, FileSpreadsheet, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function UploadArea({ onFileSelected, isUploading, error }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndPassFile(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndPassFile(e.target.files[0]);
    }
  };

  const validateAndPassFile = (file) => {
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!['.xlsx', '.xlsm', '.csv'].includes(ext)) {
      alert('Please upload an Excel (.xlsx) or CSV (.csv) file.');
      return;
    }
    onFileSelected(file);
  };

  // Generate and test with a sample CSV on the fly
  const loadSampleData = () => {
    const csvContent = 
`Company Name,Website,Industry,Country
OpenAI,openai.com,Artificial Intelligence,USA
Stripe,stripe.com,Financial Tech,USA
GitHub,github.com,Developer Tools,USA
Slack,slack.com,Productivity,USA
Dropbox,dropbox.com,Cloud Storage,USA`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const sampleFile = new File([blob], 'sample_companies.csv', { type: 'text/csv' });
    onFileSelected(sampleFile);
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center py-8 px-4 sm:px-6">
      {/* Hero Headings */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Automated Business Email Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
          Find Public Business Emails <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            From Hundreds of Websites
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Upload your Excel file, scan company websites, and download your updated spreadsheet.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 transition-all duration-200 bg-white ${
          isDragOver
            ? 'border-blue-500 bg-blue-50/50 scale-[1.01] shadow-lg'
            : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50/50 shadow-sm'
        } ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".xlsx,.xlsm,.csv"
          className="hidden"
          id="spreadsheet-upload-input"
        />

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-bold text-navy-900">
          Drag and drop your spreadsheet here
        </h3>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Supports Microsoft Excel (.xlsx) and CSV files up to 10 MB
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:scale-95"
            id="browse-files-btn"
          >
            {isUploading ? 'Analyzing File...' : 'Browse Files'}
          </button>

          <button
            type="button"
            onClick={loadSampleData}
            disabled={isUploading}
            className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition active:scale-95 flex items-center justify-center gap-2 border border-slate-200"
            id="sample-data-btn"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            Try with 5 sample companies
          </button>
        </div>

        {/* Feature points */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap justify-center gap-y-2 gap-x-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Preserves original columns
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Protocol-free URLs supported
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Never overwrites original
          </span>
        </div>
      </div>

      {/* Error feedback */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3 text-left animate-shake">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
