import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, Mail, UserCheck, Menu, X } from 'lucide-react';
import ProjectManager from '../components/admin/ProjectManager';
import ClientManager from '../components/admin/ClientManager';
import ContactViewer from '../components/admin/ContactViewer';
import SubscriberViewer from '../components/admin/SubscriberViewer';

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { path: '/admin/clients', icon: Users, label: 'Clients' },
    { path: '/admin/contacts', icon: Mail, label: 'Contacts' },
    { path: '/admin/subscribers', icon: UserCheck, label: 'Subscribers' },
  ];

  const isActive = (path, exact) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '260px' : '0',
        background: '#0f172a',
        color: 'white',
        transition: 'width 0.3s',
        overflow: 'hidden',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
      }}>
        <div style={{ padding: '2rem 1.5rem' }}>
          {/* Logo */}
          <div style={{
            fontSize: '1.75rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem',
            fontFamily: 'Poppins, sans-serif',
          }}>
            Nexora Admin
          </div>

          {/* Menu Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 1rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  color: isActive(item.path, item.exact) ? 'white' : '#94a3b8',
                  background: isActive(item.path, item.exact) ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' : 'transparent',
                  transition: 'all 0.3s',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path, item.exact)) {
                    e.currentTarget.style.background = 'rgba(249, 115, 22, 0.1)';
                    e.currentTarget.style.color = '#f97316';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path, item.exact)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#94a3b8';
                  }
                }}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Back to Home */}
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.875rem',
              marginTop: '2rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              color: '#94a3b8',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f97316';
              e.currentTarget.style.color = '#f97316';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            ← Back to Website
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? '260px' : '0',
        transition: 'margin-left 0.3s',
      }}>
        {/* Top Bar */}
        <header style={{
          background: 'white',
          padding: '1.5rem 2rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1e293b',
          }}>
            {menuItems.find(item => isActive(item.path, item.exact))?.label || 'Dashboard'}
          </h1>
        </header>

        {/* Page Content */}
        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
                  Welcome to Admin Dashboard
                </h2>
                <p style={{ color: '#64748b', fontSize: '1.125rem' }}>
                  Select a section from the sidebar to manage your content.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                  marginTop: '2rem',
                }}>
                  {menuItems.slice(1).map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        padding: '2rem',
                        background: 'white',
                        borderRadius: '1rem',
                        textDecoration: 'none',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(249, 115, 22, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      <item.icon size={32} color="#f97316" style={{ marginBottom: '1rem' }} />
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b' }}>
                        {item.label}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            } />
            <Route path="/projects" element={<ProjectManager />} />
            <Route path="/clients" element={<ClientManager />} />
            <Route path="/contacts" element={<ContactViewer />} />
            <Route path="/subscribers" element={<SubscriberViewer />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
