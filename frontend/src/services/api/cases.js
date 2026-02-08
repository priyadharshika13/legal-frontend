import { api } from './client';

// 1) Create case (intake)
export const intakeCaseApi = (payload) => api.post("/cases/intake", payload);

// 2) List cases (backend: GET /cases?limit=50, no offset)
export const listCasesApi = (limit = 50) => api.get("/cases", { params: { limit } });

// 3) Get case details
export const getCaseApi = (caseId) => api.get(`/cases/${caseId}`);

// 4) Update case (PATCH; supports status and all CaseIntakeUpdate fields)
export const updateCaseApi = (caseId, payload) => api.patch(`/cases/${caseId}`, payload);

// 5) Upload one file to case (backend expects form key "file")
export const uploadCaseFileApi = (caseId, file) => {
  const fd = new FormData();
  fd.append("file", file);

  return api.post(`/cases/${caseId}/upload`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 6) Upload MULTIPLE files (client-side loop)
export const uploadCaseFilesApi = async (caseId, files, onProgress) => {
  const results = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const res = await api.post(
      `/cases/${caseId}/upload`,
      (() => {
        const fd = new FormData();
        fd.append("file", f);
        return fd;
      })(),
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (!onProgress) return;
          const pct = evt.total ? Math.round((evt.loaded * 100) / evt.total) : 0;
          onProgress({ index: i, name: f.name, percent: pct });
        },
      }
    );
    results.push(res.data);
  }
  return results;
};

// 7) Run AI on case
export const runCaseAiApi = (caseId) => api.post(`/cases/${caseId}/ai`);
