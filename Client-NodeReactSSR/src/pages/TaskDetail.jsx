
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTask } from '../api.js';

export default function TaskDetail() {
  const { id } = useParams();
  const [state, setState] = useState({ item: null, loading: true, error: null });

  useEffect(() => {
    let mounted = true;
    getTask(id)
      .then((item) => mounted && setState({ item, loading: false, error: null }))
      .catch((e) => mounted && setState({ item: null, loading: false, error: e.message }));
    return () => (mounted = false);
  }, [id]);

  if (state.loading) return <div>Loading…</div>;
  if (state.error) return <div style={{ color: 'crimson' }}>Error: {state.error}</div>;
  if (!state.item) return <div>Not found</div>;

  const t = state.item;
  return (
    <div>
      <h2>{t.title} {t.completed ? <span style={{ color: 'green' }}>✓</span> : null}</h2>
      {t.description ? <p>{t.description}</p> : <p style={{ color: '#666' }}>No description</p>}
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to={`/tasks/${t.id}/edit`}>Edit</Link>
        <Link to={`/tasks/${t.id}/delete`} style={{ color: 'crimson' }}>Delete</Link>
        <Link to="/">Back</Link>
      </div>
    </div>
  );
}

