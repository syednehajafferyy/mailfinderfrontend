import React from 'react';
import { 
  Play, Pause, XCircle, RotateCcw, CheckCircle2, 
  Search, AlertOctagon, HelpCircle, Loader2, Download
} from 'lucide-react';
import { getDownloadUrl } from '../api';

export default function ProgressDashboard({
  jobSummary,
  onPause,
  onResume,
  onCancel,
  onRetry,
  isActionLoading
}) {
  if (!jobSummary) return null;

  const total = jobSummary.total_rows || 1;
  const processed = jobSummary.processed_count || 0;
  const percentage = Math.min(100, Math.round((processed / total) * 100));

  const isRunning = jobSummary.status === 'running';
  const isPaused = jobSummary.status === 'paused';
  const isCompleted = jobSummary.status === 'completed';
  const isCancelled = jobSummary.status === 'cancelled';

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {/* Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 
                ${isRunning ? 'bg-blue-100 text-blue-800' : isPaused ? 'bg-amber-100 text-amber-800' : isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}">
                {isRunning && <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />}
                {isRunning && <span className="w-2 h-2 rounded-full bg-blue-600 -ml-3.5" />}
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {jobSummary.status}
              </span>
              <span className="text-xs text-slate-400 font-mono">Job ID: {jobSummary.job_id}</span>
            </div>

            <h2 className="text-2xl font-extrabold text-navy-900 mt-2">
              {isCompleted ? (
                'Scanning Complete'
              ) : isCancelled ? (
                'Scan Cancelled'
              ) : (
                `Processing ${processed} of ${total} websites`
              )}
            </h2>

            {isRunning && jobSummary.current_website && (
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 truncate max-w-md">
                <Loader2 className="w-3 h-3 text-blue-600 animate-spin shrink-0" />
                <span className="text-slate-400">Current target:</span>
                <span className="font-mono text-slate-700 truncate">{jobSummary.current_website}</span>
              </p>
            )}
          </div>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {isRunning && (
              <button
                onClick={onPause}
                disabled={isActionLoading}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl transition flex items-center gap-1.5 active:scale-95 border border-slate-200"
                id="pause-scan-btn"
              >
                <Pause className="w-3.5 h-3.5" />
                Pause
              </button>
            )}

            {isPaused && (
              <button
                onClick={onResume}
                disabled={isActionLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 active:scale-95"
                id="resume-scan-btn"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Resume
              </button>
            )}

            {(isRunning || isPaused) && (
              <button
                onClick={onCancel}
                disabled={isActionLoading}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium text-xs rounded-xl transition flex items-center gap-1.5 active:scale-95 border border-rose-200"
                id="cancel-scan-btn"
              >
                <XCircle className="w-3.5 h-3.5" />
                Cancel
              </button>
            )}

            {jobSummary.failed_count > 0 && !isRunning && (
              <button
                onClick={onRetry}
                disabled={isActionLoading}
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-medium text-xs rounded-xl transition flex items-center gap-1.5 active:scale-95 border border-amber-200"
                id="retry-failed-btn"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retry Failed ({jobSummary.failed_count})
              </button>
            )}

            {processed > 0 && (
              <a
                href={getDownloadUrl(jobSummary.job_id, 'xlsx')}
                download
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 active:scale-95"
                id="quick-download-excel-btn"
              >
                <Download className="w-3.5 h-3.5" />
                Export Excel
              </a>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="py-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Overall Progress</span>
            <span className="font-mono text-navy-900 text-sm font-bold">{percentage}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isCompleted
                  ? 'bg-emerald-500'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* 6 Summary Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total</span>
            <div className="text-2xl font-black text-navy-900 mt-1">{total}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80">
            <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">Processed</span>
            <div className="text-2xl font-black text-blue-900 mt-1">{processed}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Remaining</span>
            <div className="text-2xl font-black text-slate-700 mt-1">{jobSummary.remaining_count}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Emails Found
            </span>
            <div className="text-2xl font-black text-emerald-800 mt-1">{jobSummary.emails_found_count}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-100/70 border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">No Email</span>
            <div className="text-2xl font-black text-slate-700 mt-1">{jobSummary.no_email_count}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
            <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider flex items-center gap-1">
              <AlertOctagon className="w-3 h-3" /> Failed / Blocked
            </span>
            <div className="text-2xl font-black text-rose-800 mt-1">{jobSummary.failed_count}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
