'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Security = {
  id: string;
  securityKey: string;
  name: string;
  type: string;
  currency: string;
  isActive: boolean;
};

export default function SecuritiesListPage() {
  const [items, setItems] = useState<Security[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/securities');
      if (!res.ok) {
        setItems([]);
        setLoading(false);
        return;
      }
      const data = (await res.json()) as { items: Security[] };
      setItems(data.items || []);
      setLoading(false);
    })();
  }, []);

  return (
    <main style={{ maxWidth: 900, margin: '40px auto' }}>
      <h1>Securities</h1>
      <div style={{ margin: '12px 0' }}>
        <Link href="/securities/new">+ New Security</Link>
      </div>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <table border={1} cellPadding={6} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Key</th><th>Name</th><th>Type</th><th>Currency</th><th>Active</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.id}>
                <td>{s.securityKey}</td>
                <td>{s.name}</td>
                <td>{s.type}</td>
                <td>{s.currency}</td>
                <td>{s.isActive ? 'Yes' : 'No'}</td>
                <td>
                  <Link href={`/securities/${s.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={6}>No securities yet.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </main>
  );
}
