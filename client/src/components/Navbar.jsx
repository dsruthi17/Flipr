import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Logo */}
        <div style={{
          fontSize: '1.75rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'Poppins, sans-serif',
        }}>
          Flipr
        </div>

        {/* Desktop Menu */}
        <div style={{
          display: isOpen ? 'none' : 'flex',
          gap: '2rem',
          alignItems: 'center',
        }} className="desktop-menu">
          <button onClick={() => scrollToSection('projects')} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            color: '#1e293b',
            transition: 'color 0.3s',
          }}>Projects</button>
          <button onClick={() => scrollToSection('contact')} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            color: '#1e293b',
            transition: 'color 0.3s',
          }}>About</button>
          <button onClick={() => scrollToSection('clients')} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            color: '#1e293b',
            transition: 'color 0.3s',
          }}>Clients</button>
          <button onClick={() => scrollToSection('contact')} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            color: '#1e293b',
            transition: 'color 0.3s',
          }}>Contact</button>
          <a href="/admin" style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            color: 'white',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}>Admin</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          className="mobile-menu-btn"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          background: 'white',
          padding: '1rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <button onClick={() => scrollToSection('projects')} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            color: '#1e293b',
            textAlign: 'left',
            padding: '0.5rem 0',
          }}>Projects</button>
          <button onClick={() => scrollToSection('contact')} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            color: '#1e293b',
            textAlign: 'left',
            padding: '0.5rem 0',
          }}>About</button>
          <button onClick={() => scrollToSection('clients')} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            color: '#1e293b',
            textAlign: 'left',
            padding: '0.5rem 0',
          }}>Clients</button>
          <button onClick={() => scrollToSection('contact')} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            color: '#1e293b',
            textAlign: 'left',
            padding: '0.5rem 0',
          }}>Contact</button>
          <a href="/admin" style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            color: 'white',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '600',
            textAlign: 'center',
          }}>Admin</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
