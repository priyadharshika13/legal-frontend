import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AppLayout from "../../layout/AppLayout";
import { useDropzone } from "react-dropzone";

import {
  intakeCaseApi,
  getCaseApi,
  uploadCaseFilesApi,
  runCaseAiApi,
} from "../../services/api/cases";

export default function CaseIntake() {
  const { t, i18n } = useTranslation();

  const [form, setForm] = useState({
    clientName: "",
    mobile: "",
    caseType: "",
    court: "",
    district: "",
    summary: "",
  });

  const [caseId, setCaseId] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]); // [{name}]
  const [reading, setReading] = useState("");

  const [ai, setAi] = useState({
    oneLiner: "",
    nextSteps: "",
    possibleLaws: "",
  });

  const [busy, setBusy] = useState(false);
  const [uploadState, setUploadState] = useState({ name: "", percent: 0 });

  const onChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const language = useMemo(() => {
    const lang = i18n.language || "en";
    if (lang.startsWith("ta")) return "ta";
    if (lang.startsWith("hi")) return "hi";
    return "en";
  }, [i18n.language]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDrop: (files) => setSelectedFiles(files),
  });

  const saveCase = async () => {
    setBusy(true);
    try {
      // Map your form to backend intake schema (recommended)
      const payload = {
        client_name: (form.clientName || "").trim() || "Unknown",
        mobile: (form.mobile || "").trim() || null,
        case_type: (form.caseType || "").trim() || "General",
        court: (form.court || "").trim() || null,
        district: (form.district || "").trim() || null,
        summary: (form.summary || "").trim() || null,
        language,
      };

      const res = await intakeCaseApi(payload);
      const newId = res.data?.id;
      setCaseId(newId);

      // show extracted text + ai from response
      setReading(res.data?.extracted_text || "");
      setAi({
        oneLiner: res.data?.ai_case_one_liner || "",
        nextSteps: res.data?.ai_next_steps || "",
        possibleLaws: res.data?.ai_possible_laws || "",
      });

      alert(`Case saved. Case ID: ${newId}`);
    } catch (e) {
      alert(
        e?.response?.data?.detail ||
          e?.response?.data?.message ||
          e.message ||
          "Failed to save case"
      );
    } finally {
      setBusy(false);
    }
  };

  const uploadFiles = async () => {
    if (!caseId) return alert("Save case first.");
    if (!selectedFiles.length) return alert("Select files first.");

    setBusy(true);
    setUploadState({ name: "", percent: 0 });

    try {
      // Upload files one-by-one (so you get progress + simpler backend)
      const results = await uploadCaseFilesApi(caseId, selectedFiles, (p) =>
        setUploadState({ name: p.name, percent: p.percent })
      );

      // Each upload returns CaseOut (latest), so take the last one
      const latest = results[results.length - 1];

      // update UI from latest case data
      setReading(latest?.extracted_text || "");
      setAi({
        oneLiner: latest?.ai_case_one_liner || "",
        nextSteps: latest?.ai_next_steps || "",
        possibleLaws: latest?.ai_possible_laws || "",
      });

      // show uploaded file names in UI
      setUploadedFiles(selectedFiles.map((f) => ({ name: f.name })));
      setSelectedFiles([]);

      alert("Files uploaded & text extracted (if supported).");
    } catch (e) {
      alert(
        e?.response?.data?.detail ||
          e?.response?.data?.message ||
          e.message ||
          "Upload failed"
      );
    } finally {
      setBusy(false);
      setUploadState({ name: "", percent: 0 });
    }
  };

  const refreshCase = async () => {
    if (!caseId) return;
    setBusy(true);
    try {
      const res = await getCaseApi(caseId);
      setReading(res.data?.extracted_text || "");
      setAi({
        oneLiner: res.data?.ai_case_one_liner || "",
        nextSteps: res.data?.ai_next_steps || "",
        possibleLaws: res.data?.ai_possible_laws || "",
      });
    } catch (e) {
      alert(e?.response?.data?.detail || e.message || "Failed to refresh");
    } finally {
      setBusy(false);
    }
  };

  const runAi = async () => {
    if (!caseId) return alert("Save case first.");
    setBusy(true);
    try {
      const res = await runCaseAiApi(caseId);
      setAi({
        oneLiner: res.data?.ai_case_one_liner || "",
        nextSteps: res.data?.ai_next_steps || "",
        possibleLaws: res.data?.ai_possible_laws || "",
      });
      alert("AI generated.");
    } catch (e) {
      alert(e?.response?.data?.detail || e.message || "AI failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppLayout title={t("caseIntakeTitle")}>
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>{t("clientDetails")}</div>

          <label style={styles.label}>{t("clientName")}</label>
          <input
            style={styles.input}
            value={form.clientName}
            onChange={(e) => onChange("clientName", e.target.value)}
          />

          <label style={styles.label}>{t("mobile")}</label>
          <input
            style={styles.input}
            value={form.mobile}
            onChange={(e) => onChange("mobile", e.target.value)}
          />
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>{t("caseDetails")}</div>

          <label style={styles.label}>{t("caseType")}</label>
          <input
            style={styles.input}
            value={form.caseType}
            onChange={(e) => onChange("caseType", e.target.value)}
          />

          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>{t("court")}</label>
              <input
                style={styles.input}
                value={form.court}
                onChange={(e) => onChange("court", e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>{t("district")}</label>
              <input
                style={styles.input}
                value={form.district}
                onChange={(e) => onChange("district", e.target.value)}
              />
            </div>
          </div>

          <label style={styles.label}>{t("summary")}</label>
          <textarea
            style={styles.textarea}
            rows={5}
            value={form.summary}
            onChange={(e) => onChange("summary", e.target.value)}
          />
        </div>
      </div>

      <div style={styles.row}>
        <button style={styles.primary} onClick={saveCase} disabled={busy}>
          {busy ? "Working..." : t("saveContinue")}
        </button>

        <button style={styles.secondaryBtn} onClick={refreshCase} disabled={busy || !caseId}>
          Refresh
        </button>

        <button style={styles.secondaryBtn} onClick={runAi} disabled={busy || !caseId}>
          Run AI
        </button>

        <div style={{ color: "#A0A0A0", fontSize: 12 }}>
          Case ID: <b style={{ color: "#F5C76A" }}>{caseId || "-"}</b>
        </div>
      </div>

      {/* Upload */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>{t("uploadFiles")}</div>

        <div
          {...getRootProps()}
          style={{
            ...styles.drop,
            borderColor: isDragActive ? "#F5C76A" : "#2a2b33",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? "Drop files here…" : "Drag & drop files here, or click to select"}
        </div>

        {selectedFiles.length ? (
          <div style={{ marginTop: 10, color: "#A0A0A0", fontSize: 13 }}>
            Selected: {selectedFiles.map((f) => f.name).join(", ")}
          </div>
        ) : null}

        {uploadState.name ? (
          <div style={{ marginTop: 10, color: "#A0A0A0", fontSize: 13 }}>
            Uploading: <b style={{ color: "#F5C76A" }}>{uploadState.name}</b> ({uploadState.percent}%)
          </div>
        ) : null}

        <button
          style={styles.secondaryBtn}
          onClick={uploadFiles}
          disabled={busy || !caseId || !selectedFiles.length}
        >
          Upload to Case
        </button>

        {uploadedFiles.length ? (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>Uploaded Files</div>
            <div style={{ display: "grid", gap: 10 }}>
              {uploadedFiles.map((f, idx) => (
                <div key={idx} style={styles.fileRow}>
                  <div style={{ fontWeight: 800 }}>{f.name}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* File Output */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>File Reading Output</div>
        <textarea
          style={styles.textarea}
          rows={10}
          value={reading}
          readOnly
          placeholder="Text extracted from file will appear here..."
        />
      </div>

      {/* AI Output */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>AI Output</div>

        <label style={styles.label}>One-liner</label>
        <textarea style={styles.textarea} rows={2} value={ai.oneLiner} readOnly />

        <label style={styles.label}>Next Steps</label>
        <textarea style={styles.textarea} rows={5} value={ai.nextSteps} readOnly />

        <label style={styles.label}>Possible Laws / Punishments</label>
        <textarea style={styles.textarea} rows={5} value={ai.possibleLaws} readOnly />
      </div>
    </AppLayout>
  );
}

const styles = {
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  row: { display: "flex", gap: 12, alignItems: "center", marginTop: 14, flexWrap: "wrap" },

  card: {
    background: "#111218",
    border: "1px solid #2a2b33",
    borderRadius: 18,
    padding: 14,
    marginTop: 14,
  },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: "#F5C76A", letterSpacing: 0.4 },

  label: { display: "block", fontSize: 12, color: "#A0A0A0", marginTop: 10, marginBottom: 6 },
  input: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid #2a2b33",
    background: "#050507",
    color: "#F5F5F5",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid #2a2b33",
    background: "#050507",
    color: "#F5F5F5",
    outline: "none",
    resize: "vertical",
  },

  drop: {
    padding: 18,
    borderRadius: 14,
    border: "1px dashed #2a2b33",
    background: "#050507",
    color: "#A0A0A0",
    fontWeight: 800,
    textAlign: "center",
    cursor: "pointer",
  },

  primary: {
    padding: "12px 18px",
    borderRadius: 999,
    background: "#F5C76A",
    color: "#111",
    border: "none",
    fontWeight: 900,
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #2a2b33",
    background: "#050507",
    color: "#A0A0A0",
    fontWeight: 900,
    cursor: "pointer",
  },

  fileRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 14,
    border: "1px solid #2a2b33",
    background: "#050507",
  },
};
