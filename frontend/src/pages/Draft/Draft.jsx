import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../layout/AppLayout';
import { generateWritDraftApi, generateCounterDraftApi, generateLegalNoticeDraftApi } from '../../services/api/draft';

const ALL_ARTICLES = [
  '14', '19', '20', '21', '21A', '22', '23', '24', '25', '26', '29', '30',
  '32', '226', '227', '300A',
];

export default function Draft() {
  const { t, i18n } = useTranslation();

  const [draftType, setDraftType] = useState('writ');

  const [autoGenerate, setAutoGenerate] = useState(true);

  const [court, setCourt] = useState('Madras High Court');
  const [jurisdiction, setJurisdiction] = useState('226');
  const [petitioner, setPetitioner] = useState('');
  const [respondent, setRespondent] = useState('');

  // ✅ NEW: constitutional articles involved (not jurisdiction)
  const [articles, setArticles] = useState(['14', '21']);

  const [facts, setFacts] = useState('');

  const [output, setOutput] = useState('');
  const [notes, setNotes] = useState('');
  const [negative, setNegative] = useState('');
  const [missing, setMissing] = useState('');

  const [busy, setBusy] = useState(false);
  const debounceRef = useRef(null);
  const lastRequestRef = useRef(0);

  const draftLabel = useMemo(() => {
    if (draftType === 'writ') return t('writ');
    if (draftType === 'counter') return t('counter');
    return t('legalNotice');
  }, [draftType, t]);

  const lang = useMemo(() => {
    return (i18n.language || 'en').startsWith('ta') ? 'ta' : 'en';
  }, [i18n.language]);

  const resetOutputs = () => {
    setOutput('');
    setNotes('');
    setNegative('');
    setMissing('');
  };

  const onGenerate = async () => {
    const cleanFacts = facts.trim();
    if (!cleanFacts || cleanFacts.length < 20) {
      // Don’t spam user with alerts during auto mode
      if (draftType === 'writ') return;
    }

    // avoid overlapping responses (latest wins)
    const reqId = Date.now();
    lastRequestRef.current = reqId;

    setBusy(true);
    try {
      if (draftType === 'writ') {
        const payload = {
          court,
          jurisdiction: jurisdiction === '32' ? '32' : '226',
          petitioner: petitioner || null,
          respondent: respondent || null,
          facts: cleanFacts,
          reliefs: [],
          opponent_points: null,
          previous_judgments: [],
          language: lang,
        };
        const res = await generateWritDraftApi(payload);
        if (lastRequestRef.current !== reqId) return;
        const data = res.data || {};
        setOutput(data?.writ_petition || '');
        setNotes(data?.notes || '');
        setNegative((data?.negative_points || []).map((x, i) => `${i + 1}. ${x}`).join('\n'));
        setMissing((data?.missing_info || []).map((x, i) => `${i + 1}. ${x}`).join('\n'));
      } else if (draftType === 'counter') {
        const payload = {
          court,
          jurisdiction: jurisdiction === '32' ? '32' : '226',
          petitioner: petitioner || 'Petitioner',
          respondent: respondent || 'Respondent',
          petition_summary: cleanFacts,
          facts_from_respondent: cleanFacts,
          preliminary_objections: [],
          previous_judgments: [],
          language: lang,
        };
        const res = await generateCounterDraftApi(payload);
        if (lastRequestRef.current !== reqId) return;
        const data = res.data || {};
        setOutput(data?.counter_affidavit || '');
        setNotes(data?.notes || '');
        setNegative((data?.negative_points || []).map((x, i) => `${i + 1}. ${x}`).join('\n'));
        setMissing((data?.missing_info || []).map((x, i) => `${i + 1}. ${x}`).join('\n'));
      } else if (draftType === 'notice') {
        const payload = {
          matter_type: 'General',
          sender_name: petitioner || 'Sender',
          sender_address: '',
          receiver_name: respondent || 'Receiver',
          receiver_address: '',
          facts: cleanFacts,
          demands: ['As per facts above'],
          notice_period_days: 15,
          language: lang,
          tone: 'firm',
        };
        const res = await generateLegalNoticeDraftApi(payload);
        if (lastRequestRef.current !== reqId) return;
        const data = res.data || {};
        setOutput(data?.legal_notice || '');
        setNotes(data?.notes || '');
        setNegative((data?.negative_points || []).map((x, i) => `${i + 1}. ${x}`).join('\n'));
        setMissing((data?.missing_info || []).map((x, i) => `${i + 1}. ${x}`).join('\n'));
      }
    } catch (e) {
      if (lastRequestRef.current !== reqId) return;
      const msg = e?.response?.data?.detail || e?.message || 'Draft generation failed';
      resetOutputs();
      setOutput(msg);
    } finally {
      if (lastRequestRef.current === reqId) setBusy(false);
    }
  };

  // ✅ Auto-generate with debounce
  useEffect(() => {
    if (!autoGenerate) return;

    // clear previous timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // schedule
    debounceRef.current = setTimeout(() => {
      onGenerate();
    }, 1200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // trigger when these change
  }, [autoGenerate, facts, court, jurisdiction, petitioner, respondent, articles, lang, draftType]);

  const toggleArticle = (a) => {
    setArticles((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  };

  return (
    <AppLayout title={t('draftTitle')}>
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>{t('draftType')}</div>

          <select value={draftType} onChange={(e) => setDraftType(e.target.value)} style={styles.input}>
            <option value="writ">{t('writ')}</option>
            <option value="counter">{t('counter')}</option>
            <option value="notice">{t('legalNotice')}</option>
          </select>

          <div style={styles.rowBetween}>
            <div style={{ color: '#A0A0A0', fontWeight: 800 }}>Auto Generate</div>
            <label style={styles.switch}>
              <input
                type="checkbox"
                checked={autoGenerate}
                onChange={(e) => setAutoGenerate(e.target.checked)}
              />
              <span style={styles.slider} />
            </label>
          </div>

          <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            <input style={styles.input} value={court} onChange={(e) => setCourt(e.target.value)} placeholder="Court (e.g., Madras High Court)" />

            <select style={styles.input} value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)}>
              <option value="226">Article 226</option>
              <option value="32">Article 32</option>
            </select>

            <input style={styles.input} value={petitioner} onChange={(e) => setPetitioner(e.target.value)} placeholder="Petitioner (optional)" />
            <input style={styles.input} value={respondent} onChange={(e) => setRespondent(e.target.value)} placeholder="Respondent (optional)" />
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={styles.cardTitle}>Constitutional Articles (involved)</div>
            <div style={styles.chips}>
              {ALL_ARTICLES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleArticle(a)}
                  style={{
                    ...styles.chip,
                    borderColor: articles.includes(a) ? '#F5C76A' : '#2a2b33',
                    color: articles.includes(a) ? '#F5C76A' : '#A0A0A0',
                  }}
                >
                  Art. {a}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={styles.cardTitle}>{t('prompt')}</div>
            <textarea
              rows={10}
              style={styles.textarea}
              value={facts}
              onChange={(e) => setFacts(e.target.value)}
              placeholder="Type facts... Auto-generation starts after you stop typing."
            />
          </div>

          <button style={styles.primary} onClick={onGenerate} disabled={busy}>
            {busy ? 'Generating...' : t('generate')}
          </button>

          <div style={{ color: '#A0A0A0', fontSize: 12, marginTop: 8 }}>
            {autoGenerate ? 'Auto mode ON: generates after typing stops.' : 'Auto mode OFF: click Generate.'}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>{t('generatedOutput')}</div>
          <textarea rows={12} style={styles.textarea} value={output} readOnly />

          <div style={{ height: 12 }} />

          <div style={styles.cardTitle}>Notes</div>
          <textarea rows={6} style={styles.textarea} value={notes} readOnly />

          <div style={{ height: 12 }} />

          <div style={styles.cardTitle}>Negative Points (Our Side)</div>
          <textarea rows={6} style={styles.textarea} value={negative} readOnly />

          <div style={{ height: 12 }} />

          <div style={styles.cardTitle}>Missing Info</div>
          <textarea rows={6} style={styles.textarea} value={missing} readOnly />
        </div>
      </div>
    </AppLayout>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  card: { background: '#111218', border: '1px solid #2a2b33', borderRadius: 18, padding: 14 },
  cardTitle: { fontWeight: 900, marginBottom: 10, color: '#F5C76A', letterSpacing: 0.4 },
  input: { width: '100%', padding: '12px 12px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#F5F5F5', outline: 'none' },
  textarea: { width: '100%', padding: '12px 12px', borderRadius: 12, border: '1px solid #2a2b33', background: '#050507', color: '#F5F5F5', outline: 'none', resize: 'vertical' },
  primary: { marginTop: 12, padding: '12px 18px', borderRadius: 999, background: '#F5C76A', color: '#111', border: 'none', fontWeight: 900, cursor: 'pointer' },

  chips: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  chip: { padding: '8px 10px', borderRadius: 999, border: '1px solid #2a2b33', background: '#050507', fontWeight: 900, cursor: 'pointer' },

  rowBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },

  switch: { position: 'relative', display: 'inline-block', width: 44, height: 24 },
  slider: {
    position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#2a2b33', borderRadius: 999, transition: '.2s',
  },
};
