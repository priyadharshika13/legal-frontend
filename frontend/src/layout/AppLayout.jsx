import React from 'react';
import Sidebar from './Sidebar';

export default function AppLayout({ children, title }) {
  return (
    <div style={styles.shell}>
      <Sidebar />
      <main style={styles.main}>
        <div style={styles.topBar}>
          <div style={styles.pageTitle}>{title}</div>
        </div>
        <div style={styles.content}>{children}</div>
      </main>
    </div>
  );
}

const styles = {
  shell: { display: 'flex', background: '#050507', color: '#F5F5F5' },
  main: { flex: 1, minHeight: '100vh', padding: 18 },
  topBar: {
    border: '1px solid #2a2b33',
    background: '#111218',
    borderRadius: 18,
    padding: 14,
  },
  pageTitle: { fontWeight: 900, letterSpacing: 0.5 },
  content: { maxWidth: 1200, margin: '14px auto 0' },
};
