import { api } from './client';

export async function uploadCaseFilesApi({ caseId, files }) {
  const fd = new FormData();
  fd.append('caseId', String(caseId));
  files.forEach((f) => fd.append('files', f));

  // POST /api/files/upload/
  return api.post('/api/files/upload/', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export async function readFileTextApi({ fileId }) {
  // GET /api/files/{fileId}/text/
  return api.get(`/api/files/${fileId}/text/`);
}
export async function listCaseFilesApi({ caseId }) {
  // GET /api/files/?caseId={caseId}
  return api.get('/api/files/', { params: { caseId } });
}
export async function deleteFileApi({ fileId }) {
  // DELETE /api/files/{fileId}/
  return api.delete(`/api/files/${fileId}/`);
}