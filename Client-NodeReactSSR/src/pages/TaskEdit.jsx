
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import TaskForm from '../components/TaskForm.jsx';
import { getTask, updateTask } from '../api.js';

export default function TaskEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [state, setState] = useState({ item: null, loading: true, error: null });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    getTask(id)
      .then((item) => mounted && setState({ item, loading: false, error: null }))
      .catch((e) => mounted && setState({ item: null, loading: false, error: e.message }));
    return () => (mounted = false);
  }, [id]);

  async function handleSubmit(payload) {
    setSaving(true);
    setErr(null);
    try {
      await updateTask(id, payload);
      nav(`/tasks/${id}`);
    } catch (e) {
      setErr(e.message);
      setSaving(false);
    }
  }

  if (state.loading) return <div>Loading…</div>;
  if (state.error) return <div style={{ color: 'crimson' }}>Error: {state.error}</div>;
  if (!state.item) return <div>Not found</div>;

  return (
    <div>
      <h2>Edit Task</h2>
      {err && <div style={{ color: 'crimson', marginBottom: 8 }}>Error: {err}</div>}
      <TaskForm initial={state.item} onSubmit={handleSubmit} submitting={saving} />
      <p><Link to={`/tasks/${id}`}>Cancel</Link></p>
    </div>
  );
}
