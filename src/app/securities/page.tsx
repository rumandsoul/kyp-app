'use client';
import { useEffect, useState } from 'react';

export default function SecuritiesListPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/securities');
      const data = await res.json();
      setItems(data.items || []);
      setLoading(false);
    })();
  }, []);

  return (
    <main style={{ maxWidth: 900, margin: '40px auto' }}>
      <h1>Securities</h1>
      <div style={{ margin: '12px 0' }}>
        <a href="/securities/new">+ New Security</a>
      </div>
      {loading ? <p>Loading…</p> : (
        <table border={1} cellPadding={6} style={{ width: '100%' }}>
          <thead>
            <tr><th>Key</th><th>Name</th><th>Type</th><th>Currency</th><th>Active</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.id}>
                <td>{s.securityKey}</td>
                <td>{s.name}</td>
                <td>{s.type}</td>
                <td>{s.currency}</td>
                <td>{s.isActive ? 'Yes' : 'No'}</td>
                <td><a href={`/securities/${s.id}`}>Edit</a></td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={6}>No securities yet.</td></tr>}
          </tbody>
        </table>
      )}
    </main>
  );
}

