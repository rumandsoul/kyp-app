'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewSecurityPage() {
  const router = useRouter();
  const [form, setForm] = useState({ securityKey: '', name: '', type: 'stock', currency: 'USD', isActive: true });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function save() {
    setErr(null); setSaving(true);
    const res = await fetch('/api/securities', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!res.ok) { setErr('Save failed'); return; }
    router.push('/securities');
  }

  return (
    <main style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>New Security</h1>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <div style={{ display: 'grid', gap: 10 }}>
        <input placeholder="Security Key" value={form.securityKey}
          onChange={e => setForm({ ...form, securityKey: e.target.value })} />
        <input placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Type" value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })} />
        <input placeholder="Currency (USD/CAD)" value={form.currency}
          onChange={e => setForm({ ...form, currency: e.target.value.toUpperCase() })} />
        <label>
          <input type="checkbox" checked={form.isActive}
            onChange={e => setForm({ ...form, isActive: e.target.checked })} /> Active
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={save} disabled={saving}>Save</button>
          <Link href="/securities">Cancel</Link>
        </div>
      </div>
    </main>
  );
}
