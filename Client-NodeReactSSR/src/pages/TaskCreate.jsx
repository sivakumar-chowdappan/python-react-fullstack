
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm.jsx';
import { createTask } from '../api.js';

export default function TaskCreate() {
  const nav = useNavigate();
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  async function handleSubmit(payload) {
    setSaving(true);
    setErr(null);
    try {
      const created = await createTask(payload);
      nav(`/tasks/${created.id}`);
    } catch (e) {
      setErr(e.message);
      setSaving(false);
    }
  }

  return (
    <div>
      <h2>Create Task</h2>
      {err && <div style={{ color: 'crimson', marginBottom: 8 }}>Error: {err}</div>}
      <TaskForm onSubmit={handleSubmit} submitting={saving} />
    </div>
  );
}
