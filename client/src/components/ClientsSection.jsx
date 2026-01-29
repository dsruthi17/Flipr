import { useState, useEffect } from 'react';
import { Star, Loader } from 'lucide-react';
import { getClients } from '../api';

function ClientsSection() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={18}
        fill={index < rating ? '#f97316' : 'none'}
        color={index < rating ? '#f97316' : '#cbd5e1'}
      />
    ));
  };

  return (
    <section id="clients" style={{
      padding: '6rem 2rem',
      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.03) 0%, rgba(30, 58, 138, 0.03) 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            fontFamily: 'Poppins, sans-serif',
          }}>
            Client <span style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Testimonials</span>
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Hear what our satisfied clients have to say about working with us
          </p>
        </div>

        {/* Clients Grid */}
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
          }}>
            <Loader size={40} className="animate-spin" color="#f97316" />
          </div>
        ) : clients.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'white',
            borderRadius: '1rem',
          }}>
            <p style={{ fontSize: '1.125rem', color: '#64748b' }}>
              No testimonials available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
          }}>
            {clients.map((client) => (
              <div
                key={client._id}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(249, 115, 22, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Client Image */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                }}>
                  {client.image ? (
                    <img
                      src={`http://localhost:5000${client.image}`}
                      alt={client.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid #f97316',
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                    }}>
                      {client.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '0.25rem',
                    }}>
                      {client.name}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                    }}>
                      {client.designation}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div style={{
                  display: 'flex',
                  gap: '0.25rem',
                  marginBottom: '1rem',
                }}>
                  {renderStars(client.rating || 5)}
                </div>

                {/* Testimonial */}
                <p style={{
                  fontSize: '0.9375rem',
                  color: '#475569',
                  lineHeight: '1.7',
                  fontStyle: 'italic',
                }}>
                  "{client.description}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ClientsSection;
