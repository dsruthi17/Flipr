import { Mail, Phone, MapPin, Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: '#0f172a',
      color: 'white',
      padding: '4rem 2rem 2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Company Info */}
          <div>
            <div style={{
              fontSize: '2rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
              fontFamily: 'Poppins, sans-serif',
            }}>
              Nexora
            </div>
            <p style={{
              color: '#94a3b8',
              lineHeight: '1.7',
              marginBottom: '1.5rem',
            }}>
              Creating innovative digital solutions that transform businesses and delight users.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f97316',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f97316';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(249, 115, 22, 0.1)';
                    e.currentTarget.style.color = '#f97316';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {social.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: 'white',
            }}>
              Quick Links
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              {['Home', 'Projects', 'Clients', 'Contact', 'Admin'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    style={{
                      color: '#94a3b8',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: 'white',
            }}>
              Services
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Digital Marketing', 'Consulting'].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    style={{
                      color: '#94a3b8',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: 'white',
            }}>
              Contact Us
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
                <Mail size={20} color="#f97316" style={{ marginTop: '2px' }} />
                <span style={{ color: '#94a3b8' }}>contact@nexora.com</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
                <Phone size={20} color="#f97316" style={{ marginTop: '2px' }} />
                <span style={{ color: '#94a3b8' }}>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
                <MapPin size={20} color="#f97316" style={{ marginTop: '2px' }} />
                <span style={{ color: '#94a3b8' }}>Bangalore, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(148, 163, 184, 0.2)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            color: '#94a3b8',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            © {currentYear} Nexora. Made with <Heart size={16} fill="#f97316" color="#f97316" /> in India
          </p>
          <div style={{
            display: 'flex',
            gap: '2rem',
            fontSize: '0.875rem',
          }}>
            <a
              href="#privacy"
              style={{
                color: '#94a3b8',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              style={{
                color: '#94a3b8',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
