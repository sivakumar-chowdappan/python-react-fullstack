
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_KEY = import.meta.env.VITE_API_KEY || 'your-strong-secret';

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...(options.headers || {})
    },
    ...options
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${text || 'Request failed'}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const listTasks = () => apiFetch('/tasks');
export const getTask = (id) => apiFetch(`/tasks/${id}`);
export const createTask = (payload) =>
  apiFetch('/tasks', { method: 'POST', body: JSON.stringify(payload) });
export const updateTask = (id, payload) =>
  apiFetch(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
export const deleteTask = (id) =>
  apiFetch(`/tasks/${id}`, { method: 'DELETE' });
