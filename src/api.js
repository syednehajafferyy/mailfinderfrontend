// API Client for WebMail Finder

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Upload failed' }));
    throw new Error(errorData.detail || `Upload failed (${res.status})`);
  }

  return res.json();
}

export async function startJob(fileId, urlColumn, companyColumn) {
  const res = await fetch(`${API_BASE}/api/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      file_id: fileId,
      url_column: urlColumn,
      company_column: companyColumn || null,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Failed to start scan job' }));
    throw new Error(errorData.detail || `Failed to start scan (${res.status})`);
  }

  return res.json();
}

export async function getJobStatus(jobId) {
  const res = await fetch(`${API_BASE}/api/jobs/${jobId}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Failed to fetch job status' }));
    throw new Error(errorData.detail || `Error fetching job (${res.status})`);
  }
  return res.json();
}

export async function getJobResults(jobId, page = 1, perPage = 25, filterStatus = null, search = null) {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (filterStatus && filterStatus !== 'all') {
    params.append('filter_status', filterStatus);
  }
  if (search && search.trim()) {
    params.append('search', search.trim());
  }

  const res = await fetch(`${API_BASE}/api/jobs/${jobId}/results?${params.toString()}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Failed to fetch job results' }));
    throw new Error(errorData.detail || `Error fetching results (${res.status})`);
  }
  return res.json();
}

export async function pauseJob(jobId) {
  const res = await fetch(`${API_BASE}/api/jobs/${jobId}/pause`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to pause job');
  return res.json();
}

export async function resumeJob(jobId) {
  const res = await fetch(`${API_BASE}/api/jobs/${jobId}/resume`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to resume job');
  return res.json();
}

export async function cancelJob(jobId) {
  const res = await fetch(`${API_BASE}/api/jobs/${jobId}/cancel`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to cancel job');
  return res.json();
}

export async function retryFailedJob(jobId) {
  const res = await fetch(`${API_BASE}/api/jobs/${jobId}/retry`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to retry failed items');
  return res.json();
}

export function getDownloadUrl(jobId, format = 'xlsx') {
  return `${API_BASE}/api/jobs/${jobId}/download?format=${format}`;
}
