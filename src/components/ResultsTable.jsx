import React, { useState } from 'react';
import { 
  Search, ExternalLink, Copy, Check, Filter, 
  ChevronLeft, ChevronRight, Mail, AlertCircle, ShieldAlert, Clock
} from 'lucide-react';

export default function ResultsTable({
  results,
  totalResults,
  currentPage,
  perPage,
  onPageChange,
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  isLoading
}) {
  const [copiedEmail, setCopiedEmail] = useState(null);

  const handleCopy = (email) => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const totalPages = Math.max(1, Math.ceil(totalResults / perPage));

  const filterTabs = [
    { id: 'all', label: 'All Results' },
    { id: 'found', label: 'Email Found' },
    { id: 'not_found', label: 'Not Found' },
    { id: 'connection_failed', label: 'Connection Failed' },
    { id: 'blocked', label: 'Blocked' },
    { id: 'needs_review', label: 'Needs Review' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Found':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Found
          </span>
        );
      case 'Not found':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            Not found
          </span>
        );
      case 'Connection failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
            <AlertCircle className="w-3 h-3 text-rose-600" />
            Connection failed
          </span>
        );
      case 'Blocked':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <ShieldAlert className="w-3 h-3 text-amber-600" />
            Blocked
          </span>
        );
      case 'Needs review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Needs review
          </span>
        );
      case 'Skipped':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
            Skipped
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onFilterChange(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  currentFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search domain, email, company..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              id="search-results-input"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="py-3 px-4 font-semibold w-12 text-center">#</th>
                <th className="py-3 px-4 font-semibold">Company</th>
                <th className="py-3 px-4 font-semibold">Website</th>
                <th className="py-3 px-4 font-semibold">Primary Contact Email</th>
                <th className="py-3 px-4 font-semibold">Source Page</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <Mail className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                    <p className="font-medium text-slate-500">No results found</p>
                    <p className="text-[11px] mt-0.5">
                      {searchQuery ? 'Try clearing your search query.' : 'Scanned websites will appear here in real time.'}
                    </p>
                  </td>
                </tr>
              ) : (
                results.map((res) => (
                  <tr key={res.row_index} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 text-slate-400 font-mono text-center">
                      {res.row_index + 1}
                    </td>

                    <td className="py-3 px-4 font-medium text-navy-900 max-w-[150px] truncate">
                      {res.company_name || <span className="text-slate-400 italic">—</span>}
                    </td>

                    <td className="py-3 px-4 max-w-[180px] truncate">
                      {res.original_url ? (
                        <a
                          href={res.normalized_url || (res.original_url.startsWith('http') ? res.original_url : `https://${res.original_url}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 font-mono text-[11px] truncate"
                        >
                          <span className="truncate">{res.original_url}</span>
                          <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
                        </a>
                      ) : (
                        <span className="text-slate-300 italic">Empty</span>
                      )}
                    </td>

                    <td className="py-3 px-4 max-w-[220px]">
                      {res.primary_email ? (
                        <div className="flex items-center space-x-2">
                          <a
                            href={`mailto:${res.primary_email}`}
                            className="font-medium text-blue-700 hover:text-blue-900 hover:underline font-mono text-[11px] truncate"
                          >
                            {res.primary_email}
                          </a>
                          <button
                            onClick={() => handleCopy(res.primary_email)}
                            className="text-slate-400 hover:text-blue-600 p-1 rounded hover:bg-slate-100 transition shrink-0"
                            title="Copy email to clipboard"
                          >
                            {copiedEmail === res.primary_email ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">—</span>
                      )}

                      {res.other_emails && res.other_emails.length > 0 && (
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate" title={res.other_emails.join(', ')}>
                          + {res.other_emails.length} other ({res.other_emails.slice(0, 2).join(', ')}{res.other_emails.length > 2 ? '...' : ''})
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4 max-w-[150px] truncate text-slate-500">
                      {res.source_url ? (
                        <a
                          href={res.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-blue-600 hover:underline font-mono text-[10px] truncate block"
                          title={res.source_url}
                        >
                          {res.source_url.replace(/^https?:\/\//, '')}
                        </a>
                      ) : (
                        <span className="text-slate-300 italic">—</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {getStatusBadge(res.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing {results.length > 0 ? (currentPage - 1) * perPage + 1 : 0} to{' '}
            {Math.min(currentPage * perPage, totalResults)} of {totalResults} entries
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1 || isLoading}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition"
              title="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium text-navy-900 px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || isLoading}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition"
              title="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
