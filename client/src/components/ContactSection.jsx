import { useState } from 'react';
import { Target, Eye, Heart, Send, CheckCircle } from 'lucide-react';
import { submitContact } from '../api';

function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await submitContact(formData);
      setSuccess(true);
      setFormData({ fullName: '', email: '', mobile: '', city: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{
      padding: '6rem 2rem',
      background: 'white',
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
            Get in <span style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Touch</span>
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Have a project in mind? Let's discuss how we can help bring your vision to life
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* About Us Section (Left Side) */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(30, 58, 138, 0.05) 100%)',
            padding: '2.5rem',
            borderRadius: '1rem',
            border: '1px solid rgba(249, 115, 22, 0.1)',
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#1e293b',
              fontFamily: 'Poppins, sans-serif',
            }}>
              About <span style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Nexora</span>
            </h3>

            <p style={{
              color: '#475569',
              lineHeight: '1.7',
              marginBottom: '2rem',
              fontSize: '0.9375rem',
            }}>
              We are a team of passionate designers, developers, and strategists dedicated to 
              creating exceptional digital experiences that drive business growth and delight users.
            </p>

            {/* Mission, Vision, Values */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}>
              {/* Mission */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  display: 'flex',
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)',
                  borderRadius: '0.75rem',
                  flexShrink: 0,
                }}>
                  <Target size={24} color="#f97316" />
                </div>
                <div>
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#1e293b',
                  }}>
                    Our Mission
                  </h4>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                  }}>
                    To deliver innovative digital solutions that transform businesses and exceed expectations.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  display: 'flex',
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)',
                  borderRadius: '0.75rem',
                  flexShrink: 0,
                }}>
                  <Eye size={24} color="#f97316" />
                </div>
                <div>
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#1e293b',
                  }}>
                    Our Vision
                  </h4>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                  }}>
                    To be the leading digital agency recognized globally for creating impactful experiences.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  display: 'flex',
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)',
                  borderRadius: '0.75rem',
                  flexShrink: 0,
                }}>
                  <Heart size={24} color="#f97316" />
                </div>
                <div>
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#1e293b',
                  }}>
                    Our Values
                  </h4>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                  }}>
                    Integrity, innovation, and excellence guide everything we do.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            {/* <div style={{
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(249, 115, 22, 0.2)',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
            }}>
              <div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.25rem',
                }}>
                  500+
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  fontWeight: '500',
                }}>
                  Happy Clients
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.25rem',
                }}>
                  1000+
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  fontWeight: '500',
                }}>
                  Projects Done
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.25rem',
                }}>
                  10+
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  fontWeight: '500',
                }}>
                  Years Exp.
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.25rem',
                }}>
                  50+
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  fontWeight: '500',
                }}>
                  Team Members
                </div>
              </div>
            </div> */}
          </div>

          {/* Contact Form (Right Side) */}
          <div style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#1e293b',
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f97316'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#1e293b',
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f97316'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#1e293b',
                  }}>
                    Mobile *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f97316'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#1e293b',
                  }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f97316'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                {error && (
                  <div style={{
                    padding: '0.75rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.5rem',
                    color: '#dc2626',
                    fontSize: '0.875rem',
                  }}>
                    {error}
                  </div>
                )}

                {success && (
                  <div style={{
                    padding: '0.75rem',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '0.5rem',
                    color: '#16a34a',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <CheckCircle size={16} />
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '1rem',
                    background: loading ? '#cbd5e1' : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'transform 0.3s',
                  }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  {loading ? 'Sending...' : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
