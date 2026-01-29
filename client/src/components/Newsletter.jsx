import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { subscribe } from '../api';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await subscribe(email);
      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{
      padding: '6rem 2rem',
      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #1e3a8a 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Icon */}
        <div style={{
          display: 'inline-flex',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '1rem',
          marginBottom: '1.5rem',
        }}>
          <Mail size={32} color="white" />
        </div>

        {/* Heading */}
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '800',
          color: 'white',
          marginBottom: '1rem',
          fontFamily: 'Poppins, sans-serif',
        }}>
          Subscribe to Our Newsletter
        </h2>

        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '2.5rem',
          lineHeight: '1.6',
        }}>
          Stay updated with our latest projects, insights, and exclusive offers. 
          Join our community of innovators!
        </p>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          gap: '1rem',
          maxWidth: '500px',
          margin: '0 auto',
          flexWrap: 'wrap',
        }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              flex: '1',
              minWidth: '250px',
              padding: '1rem 1.5rem',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              background: 'white',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '1rem 2rem',
              background: loading ? 'rgba(255, 255, 255, 0.5)' : 'white',
              color: '#f97316',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 30px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.75rem',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}>
            <CheckCircle size={20} />
            <span>Thank you for subscribing! Check your inbox for confirmation.</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(239, 68, 68, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.75rem',
            color: 'white',
          }}>
            {error}
          </div>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
