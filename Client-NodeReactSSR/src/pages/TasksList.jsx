
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listTasks } from '../api.js';

export default function TasksList() {
  const [data, setData] = useState({ items: [], loading: true, error: null });

  useEffect(() => {
    let mounted = true;
    listTasks()
      .then((items) => mounted && setData({ items, loading: false, error: null }))
      .catch((e) => mounted && setData({ items: [], loading: false, error: e.message }));
    return () => (mounted = false);
  }, []);

  if (data.loading) return <div>Loading tasks…</div>;
  if (data.error) return <div style={{ color: 'crimson' }}>Error: {data.error}</div>;

  return (
    <div>
      <h2>All Tasks</h2>
      {data.items.length === 0 ? (
        <p>No tasks yet. <Link to="/tasks/new">Create one</Link>.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
          {data.items.map((t) => (
            <li key={t.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Link to={`/tasks/${t.id}`} style={{ fontWeight: 600, color: '#111' }}>{t.title}</Link>
                  {t.completed ? <span style={{ marginLeft: 8, color: 'green' }}>✓</span> : null}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link to={`/tasks/${t.id}/edit`}>Edit</Link>
                  <Link to={`/tasks/${t.id}/delete`} style={{ color: 'crimson' }}>Delete</Link>
                </div>
              </div>
              {t.description ? <div style={{ color: '#555' }}>{t.description}</div> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
