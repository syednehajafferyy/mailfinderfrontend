import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import HowItWorksModal from './components/HowItWorksModal';
import UploadArea from './components/UploadArea';
import SpreadsheetPreview from './components/SpreadsheetPreview';
import ProgressDashboard from './components/ProgressDashboard';
import ResultsTable from './components/ResultsTable';
import DownloadSection from './components/DownloadSection';
import { 
  uploadFile, startJob, getJobStatus, getJobResults, 
  pauseJob, resumeJob, cancelJob, retryFailedJob 
} from './api';

export default function App() {
  const [step, setStep] = useState('upload'); // 'upload' | 'preview' | 'scanning'
  const [previewData, setPreviewData] = useState(null);
  const [jobSummary, setJobSummary] = useState(null);
  const [jobResults, setJobResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  // Pagination & Filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(25);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Loading & Error States
  const [isUploading, setIsUploading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  const pollIntervalRef = useRef(null);

  // Poll status & fetch results while job is active
  useEffect(() => {
    if (step === 'scanning' && jobSummary?.job_id) {
      const fetchLatest = async () => {
        try {
          // 1. Fetch updated job summary
          const updatedSummary = await getJobStatus(jobSummary.job_id);
          setJobSummary(updatedSummary);

          // 2. Fetch updated results view
          const resultsRes = await getJobResults(
            jobSummary.job_id,
            currentPage,
            perPage,
            currentFilter,
            searchQuery
          );
          setJobResults(resultsRes.results);
          setTotalResults(resultsRes.total);

          // Stop polling if completed or cancelled
          if (['completed', 'cancelled', 'failed'].includes(updatedSummary.status)) {
            if (pollIntervalRef.current) {
              clearInterval(pollIntervalRef.current);
              pollIntervalRef.current = null;
            }
          }
        } catch (err) {
          console.error('Polling error:', err);
        }
      };

      // Fetch immediately once
      fetchLatest();

      // Only poll periodically if running
      if (jobSummary.status === 'running') {
        pollIntervalRef.current = setInterval(fetchLatest, 1500);
      }

      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
      };
    }
  }, [step, jobSummary?.job_id, jobSummary?.status, currentPage, currentFilter, searchQuery, perPage]);

  // Handle file upload
  const handleFileSelected = async (file) => {
    setIsUploading(true);
    setErrorMessage(null);
    try {
      const preview = await uploadFile(file);
      setPreviewData(preview);
      setStep('preview');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to upload spreadsheet.');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle starting the scan
  const handleStartScan = async (fileId, urlCol, companyCol) => {
    setIsStarting(true);
    setErrorMessage(null);
    try {
      const initialJob = await startJob(fileId, urlCol, companyCol);
      setJobSummary(initialJob);
      setStep('scanning');
      setCurrentPage(1);
      setCurrentFilter('all');
      setSearchQuery('');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to initiate scanning job.');
    } finally {
      setIsStarting(false);
    }
  };

  // Controls: Pause, Resume, Cancel, Retry
  const handlePause = async () => {
    if (!jobSummary) return;
    setIsActionLoading(true);
    try {
      const updated = await pauseJob(jobSummary.job_id);
      setJobSummary(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleResume = async () => {
    if (!jobSummary) return;
    setIsActionLoading(true);
    try {
      const updated = await resumeJob(jobSummary.job_id);
      setJobSummary(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!jobSummary) return;
    if (!window.confirm('Are you sure you want to cancel the remaining scans? Discovered emails will be preserved.')) {
      return;
    }
    setIsActionLoading(true);
    try {
      const updated = await cancelJob(jobSummary.job_id);
      setJobSummary(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleRetry = async () => {
    if (!jobSummary) return;
    setIsActionLoading(true);
    try {
      const updated = await retryFailedJob(jobSummary.job_id);
      setJobSummary(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReset = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    setStep('upload');
    setPreviewData(null);
    setJobSummary(null);
    setJobResults([]);
    setErrorMessage(null);
  };

  // Refresh table results on page, filter, or search change
  const refreshResults = async (newPage, newFilter, newSearch) => {
    if (!jobSummary) return;
    setIsTableLoading(true);
    try {
      const res = await getJobResults(
        jobSummary.job_id,
        newPage,
        perPage,
        newFilter,
        newSearch
      );
      setJobResults(res.results);
      setTotalResults(res.total);
    } catch (err) {
      console.error('Failed to fetch filtered results:', err);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    refreshResults(newPage, currentFilter, searchQuery);
  };

  const handleFilterChange = (newFilter) => {
    setCurrentFilter(newFilter);
    setCurrentPage(1);
    refreshResults(1, newFilter, searchQuery);
  };

  const handleSearchChange = (newSearch) => {
    setSearchQuery(newSearch);
    setCurrentPage(1);
    refreshResults(1, currentFilter, newSearch);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-navy-900 font-sans">
      <Header
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onReset={handleReset}
        isScanning={step === 'scanning'}
      />

      <main className="flex-1 pb-16">
        {step === 'upload' && (
          <UploadArea
            onFileSelected={handleFileSelected}
            isUploading={isUploading}
            error={errorMessage}
          />
        )}

        {step === 'preview' && previewData && (
          <SpreadsheetPreview
            preview={previewData}
            onStartScan={handleStartScan}
            onChangeFile={handleReset}
            isStarting={isStarting}
          />
        )}

        {step === 'scanning' && jobSummary && (
          <>
            <ProgressDashboard
              jobSummary={jobSummary}
              onPause={handlePause}
              onResume={handleResume}
              onCancel={handleCancel}
              onRetry={handleRetry}
              isActionLoading={isActionLoading}
            />

            <DownloadSection
              jobId={jobSummary.job_id}
              processedCount={jobSummary.processed_count}
              totalCount={jobSummary.total_rows}
            />

            <ResultsTable
              results={jobResults}
              totalResults={totalResults}
              currentPage={currentPage}
              perPage={perPage}
              onPageChange={handlePageChange}
              currentFilter={currentFilter}
              onFilterChange={handleFilterChange}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              isLoading={isTableLoading}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>WebMail Finder — Free Public Business Email Discovery</span>
          <span>No accounts, no API keys, no fees.</span>
        </div>
      </footer>

      {/* How it works modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </div>
  );
}
