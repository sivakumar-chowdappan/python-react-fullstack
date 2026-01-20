
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import TasksList from './pages/TasksList.jsx';
import TaskCreate from './pages/TaskCreate.jsx';
import TaskDetail from './pages/TaskDetail.jsx';
import TaskEdit from './pages/TaskEdit.jsx';
import TaskDelete from './pages/TaskDelete.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TasksList />} />
        <Route path="/tasks" element={<Navigate to="/" replace />} />
        <Route path="/tasks/new" element={<TaskCreate />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/tasks/:id/edit" element={<TaskEdit />} />
        <Route path="/tasks/:id/delete" element={<TaskDelete />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Layout>
  );
}
