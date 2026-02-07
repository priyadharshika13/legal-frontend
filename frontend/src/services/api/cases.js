import { api } from './client';


// 1) Save intake
export const intakeCaseApi = (payload) => api.post("/cases/intake", payload);

// 2) Get case details
export const getCaseApi = (caseId) => api.get(`/cases/${caseId}`);

// 3) Upload ONE file to case
export const uploadCaseFileApi = (caseId, file) => {
  const fd = new FormData();
  fd.append("file", file);

  return api.post(`/cases/${caseId}/upload`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 4) Upload MULTIPLE files (client side loop)
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

// 5) Run AI (optional button)
export const runCaseAiApi = (caseId) => api.post(`/cases/${caseId}/ai`);
