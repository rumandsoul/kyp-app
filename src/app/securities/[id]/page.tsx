'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditSecurityPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [form, setForm] = useState({
    securityKey: '',
    name: '',
    type: 'stock',
    currency: 'USD',
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/securities/${id}`);
      if (!res.ok) { setErr('Load failed'); setLoading(false); return; }
      const data = await res.json();
      setForm({
        securityKey: data.item.securityKey,
        name: data.item.name,
        type: data.item.type,
        currency: data.item.currency,
        isActive: data.item.isActive,
      });
      setLoading(false);
    })();
  }, [id]);

  async function save() {
    setErr(null);
    const res = await fetch(`/api/securities/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) { setErr('Save failed'); return; }
    router.push('/securities');
  }

  async function remove() {
    if (!confirm('Delete this security?')) return;
    const res = await fetch(`/api/securities/${id}`, { method: 'DELETE' });
    if (!res.ok) { setErr('Delete failed'); return; }
    router.push('/securities');
  }

  if (loading) return <main style={{ maxWidth: 600, margin: '40px auto' }}>Loading…</main>;

  return (
    <main style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>Edit Security</h1>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <div style={{ display: 'grid', gap: 10 }}>
        <input placeholder="Security Key" value={form.securityKey}
          onChange={e => setForm({ ...form, securityKey: e.target.value })} />
        <input placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Type" value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })} />
        <input placeholder="Currency" value={form.currency}
          onChange={e => setForm({ ...form, currency: e.target.value.toUpperCase() })} />
        <label>
          <input type="checkbox" checked={form.isActive}
            onChange={e => setForm({ ...form, isActive: e.target.checked })} /> Active
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={save}>Save</button>
          <button onClick={remove} style={{ color: 'red' }}>Delete</button>
          <Link href="/securities">Cancel</Link>
        </div>
      </div>
    </main>
  );
}
