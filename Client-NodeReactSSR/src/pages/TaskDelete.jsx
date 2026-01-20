
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getTask, deleteTask } from '../api.js';

export default function TaskDelete() {
  const { id } = useParams();
  const nav = useNavigate();
  const [state, setState] = useState({ item: null, loading: true, error: null });
  const [deleting, setDeleting] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    getTask(id)
      .then((item) => mounted && setState({ item, loading: false, error: null }))
      .catch((e) => mounted && setState({ item: null, loading: false, error: e.message }));
    return () => (mounted = false);
  }, [id]);

  async function handleDelete() {
    setDeleting(true);
    setErr(null);
    try {
      await deleteTask(id);
      nav('/');
    } catch (e) {
      setErr(e.message);
      setDeleting(false);
    }
  }

  if (state.loading) return <div>Loading…</div>;
  if (state.error) return <div style={{ color: 'crimson' }}>Error: {state.error}</div>;
  if (!state.item) return <div>Not found</div>;

  return (
    <div>
      <h2>Delete Task</h2>
      <p>Are you sure you want to delete <strong>{state.item.title}</strong>?</p>
      {err && <div style={{ color: 'crimson', marginBottom: 8 }}>Error: {err}</div>}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{ background: 'crimson', color: '#fff', padding: '10px 16px', border: 0, borderRadius: 6 }}
        >
          {deleting ? 'Deleting…' : 'Yes, delete'}
        </button>
        <Link to={`/tasks/${id}`}>Cancel</Link>
      </div>
    </div>
  );
}
