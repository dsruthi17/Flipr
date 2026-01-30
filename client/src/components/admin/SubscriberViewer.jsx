import { useState, useEffect } from 'react';
import { Mail, Trash2, Loader, CheckCircle, XCircle } from 'lucide-react';
import { getSubscribers, deleteSubscriber } from '../../api';

function SubscriberViewer() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      const data = await getSubscribers();
      setSubscribers(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this subscriber?')) {
      try {
        await deleteSubscriber(id);
        loadSubscribers();
      } catch (error) {
        alert('Error deleting subscriber');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
        Newsletter Subscribers ({subscribers.length})
      </h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Loader size={32} className="animate-spin" color="#f97316" />
        </div>
      ) : subscribers.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
          No subscribers yet.
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Subscribed Date</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Mail size={16} color="#64748b" />
                      <span style={{ fontWeight: '500' }}>{subscriber.email}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      background: subscriber.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: subscriber.status === 'active' ? '#16a34a' : '#dc2626',
                    }}>
                      {subscriber.status === 'active' ? (
                        <CheckCircle size={14} />
                      ) : (
                        <XCircle size={14} />
                      )}
                      {subscriber.status || 'active'}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
                    {formatDate(subscriber.subscribedAt || subscriber.createdAt)}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(subscriber.id)}
                      style={{
                        padding: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SubscriberViewer;
