import React, { useState } from 'react';
import { FileSpreadsheet, ArrowRight, CheckCircle2, AlertTriangle, XCircle, Copy, Play, ArrowLeft } from 'lucide-react';

export default function SpreadsheetPreview({ preview, onStartScan, onChangeFile, isStarting }) {
  const [selectedUrlCol, setSelectedUrlCol] = useState(
    preview.detected_url_column || preview.headers[0] || ''
  );
  const [selectedCompanyCol, setSelectedCompanyCol] = useState(
    preview.detected_company_column || ''
  );

  const handleStart = () => {
    if (!selectedUrlCol) {
      alert('Please select the column that contains company website URLs.');
      return;
    }
    onStartScan(preview.file_id, selectedUrlCol, selectedCompanyCol);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 sm:px-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-900">{preview.filename}</h2>
              <p className="text-xs text-slate-500">Spreadsheet uploaded and validated</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onChangeFile}
              disabled={isStarting}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded-xl transition border border-slate-200 flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Upload Different File
            </button>
            <button
              onClick={handleStart}
              disabled={isStarting || !selectedUrlCol}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              id="start-scanning-btn"
            >
              <Play className="w-4 h-4 fill-current" />
              {isStarting ? 'Starting Scan...' : 'Find Emails'}
            </button>
          </div>
        </div>

        {/* 5 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-5">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Total Rows</div>
            <div className="text-xl font-bold text-navy-900 mt-1">{preview.total_rows}</div>
          </div>
          <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
            <div className="text-xs font-medium text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Valid Websites
            </div>
            <div className="text-xl font-bold text-emerald-900 mt-1">{preview.valid_urls_count}</div>
          </div>
          <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100">
            <div className="text-xs font-medium text-amber-700 flex items-center gap-1">
              <Copy className="w-3 h-3" /> Duplicates
            </div>
            <div className="text-xl font-bold text-amber-900 mt-1">{preview.duplicate_urls_count}</div>
          </div>
          <div className="bg-slate-100/60 p-3 rounded-xl border border-slate-200">
            <div className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Empty URLs
            </div>
            <div className="text-xl font-bold text-slate-700 mt-1">{preview.empty_urls_count}</div>
          </div>
          <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100 col-span-2 sm:col-span-1">
            <div className="text-xs font-medium text-rose-700 flex items-center gap-1">
              <XCircle className="w-3 h-3" /> Invalid URLs
            </div>
            <div className="text-xl font-bold text-rose-900 mt-1">{preview.invalid_urls_count}</div>
          </div>
        </div>

        {/* Column Mapping Section */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
              Website URL Column <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedUrlCol}
              onChange={(e) => setSelectedUrlCol(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-navy-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              id="select-website-column"
            >
              {preview.headers.map((h) => (
                <option key={h} value={h}>
                  {h} {h === preview.detected_url_column ? '(Auto-Detected)' : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">
              The column containing company domains or website links.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
              Company Name Column <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <select
              value={selectedCompanyCol}
              onChange={(e) => setSelectedCompanyCol(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-navy-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              id="select-company-column"
            >
              <option value="">-- None / Use URL as Name --</option>
              {preview.headers.map((h) => (
                <option key={h} value={h}>
                  {h} {h === preview.detected_company_column ? '(Auto-Detected)' : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">
              Used for dashboard display alongside the website.
            </p>
          </div>
        </div>
      </div>

      {/* Spreadsheet Sample Rows Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-navy-900">
            Previewing First {preview.preview_rows.length} Rows
          </h3>
          <span className="text-xs text-slate-500">
            Original row order is strictly preserved
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-2.5 px-4 font-semibold text-slate-500 w-12 text-center">#</th>
                {preview.headers.map((h) => (
                  <th
                    key={h}
                    className={`py-2.5 px-4 font-semibold ${
                      h === selectedUrlCol
                        ? 'text-blue-700 bg-blue-100/50 border-b-2 border-blue-500'
                        : 'text-slate-700'
                    }`}
                  >
                    {h}
                    {h === selectedUrlCol && (
                      <span className="ml-1 text-[10px] uppercase font-bold text-blue-600">(Scan Target)</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {preview.preview_rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition">
                  <td className="py-2.5 px-4 text-slate-400 text-center font-mono">{idx + 1}</td>
                  {preview.headers.map((h) => (
                    <td
                      key={h}
                      className={`py-2.5 px-4 truncate max-w-xs ${
                        h === selectedUrlCol ? 'font-medium text-navy-900 bg-blue-50/30' : 'text-slate-600'
                      }`}
                    >
                      {row[h] || <span className="text-slate-300 italic">Empty</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
