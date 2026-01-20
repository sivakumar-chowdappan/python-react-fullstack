
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  padding: '8px 12px',
  borderRadius: 6,
  textDecoration: 'none',
  color: isActive ? '#fff' : '#333',
  background: isActive ? '#2563eb' : 'transparent'
});

export default function Layout({ children }) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 700, fontSize: 20, color: '#111' }}>
          Tasks
        </Link>
        <nav style={{ display: 'flex', gap: 8 }}>
          <NavLink to="/" style={linkStyle}>All</NavLink>
          <NavLink to="/tasks/new" style={linkStyle}>Create</NavLink>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
