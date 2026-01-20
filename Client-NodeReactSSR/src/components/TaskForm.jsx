
import React, { useState } from 'react';

export default function TaskForm({ initial = { title: '', description: '', completed: false }, onSubmit, submitting = false }) {
  const [form, setForm] = useState(initial);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      style={{ display: 'grid', gap: 12, maxWidth: 520 }}
    >
      <label>
        <div>Title</div>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </label>

      <label>
        <div>Description</div>
        <textarea
          value={form.description || ''}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          style={{ width: '100%', padding: 8 }}
        />
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="checkbox"
          checked={!!form.completed}
          onChange={(e) => setForm({ ...form, completed: e.target.checked })}
        />
        <span>Completed</span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        style={{ background: '#2563eb', color: '#fff', padding: '10px 16px', border: 0, borderRadius: 6 }}
      >
        {submitting ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}