import React from 'react';
import { Download, FileSpreadsheet, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { getDownloadUrl } from '../api';

export default function DownloadSection({ jobId, processedCount, totalCount }) {
  if (!jobId || processedCount === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 sm:px-6">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-blue-200 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              <span>Original Spreadsheet Preserved</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Download Your Updated Spreadsheet
            </h3>
            <p className="mt-2 text-sm text-blue-100/90 leading-relaxed">
              Discovered contact emails, source links, and statuses have been inserted directly beside your website column. All original records and formatting remain intact.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={getDownloadUrl(jobId, 'xlsx')}
              download
              className="px-6 py-3.5 bg-white text-blue-900 hover:bg-blue-50 font-bold text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2 active:scale-95 text-center"
              id="download-excel-btn"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Download Excel (.xlsx)</span>
            </a>

            <a
              href={getDownloadUrl(jobId, 'csv')}
              download
              className="px-5 py-3.5 bg-blue-800/80 hover:bg-blue-800 text-white font-semibold text-sm rounded-2xl border border-white/20 transition flex items-center justify-center gap-2 active:scale-95 text-center"
              id="download-csv-btn"
            >
              <FileText className="w-4 h-4 text-blue-200" />
              <span>Download CSV</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
