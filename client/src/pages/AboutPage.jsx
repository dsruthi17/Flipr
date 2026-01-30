import { Users, Target, Eye, Award, Zap, Heart } from 'lucide-react';

function AboutPage() {
  const stats = [
    { icon: Users, label: 'Happy Clients', value: '500+' },
    { icon: Award, label: 'Projects Completed', value: '1000+' },
    { icon: Zap, label: 'Years Experience', value: '10+' },
    { icon: Heart, label: 'Team Members', value: '50+' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To deliver innovative digital solutions that transform businesses and exceed client expectations through cutting-edge technology and creative excellence.'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the leading digital agency recognized globally for creating impactful, user-centric experiences that drive business growth and innovation.'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Integrity, innovation, and excellence guide everything we do. We believe in building lasting relationships through transparent communication and exceptional results.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(30, 58, 138, 0.05) 100%)',
        padding: '8rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite',
        }} />

        <div style={{
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1.5rem',
            fontFamily: 'Poppins, sans-serif',
          }}>
            About <span style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Nexora</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.8',
          }}>
            We are a team of passionate designers, developers, and strategists dedicated to 
            creating exceptional digital experiences that drive business growth and delight users.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'white',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                padding: '2rem',
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(30, 58, 138, 0.05) 100%)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(249, 115, 22, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'inline-flex',
                padding: '1rem',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                borderRadius: '1rem',
                marginBottom: '1rem',
              }}>
                <stat.icon size={32} color="white" />
              </div>
              <h3 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem',
              }}>
                {stat.value}
              </h3>
              <p style={{
                color: '#64748b',
                fontWeight: '500',
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.03) 0%, rgba(30, 58, 138, 0.03) 100%)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            {values.map((value, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '2.5rem',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(249, 115, 22, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)',
                  borderRadius: '0.75rem',
                  marginBottom: '1.5rem',
                }}>
                  <value.icon size={32} color="#f97316" />
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#1e293b',
                }}>
                  {value.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section style={{
        padding: '6rem 2rem',
        background: 'white',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: '2rem',
            fontFamily: 'Poppins, sans-serif',
          }}>
            Our <span style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Story</span>
          </h2>
          <div style={{
            textAlign: 'left',
            color: '#475569',
            fontSize: '1.125rem',
            lineHeight: '1.8',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}>
            <p>
              Founded in 2014, Nexora started with a simple mission: to help businesses thrive in 
              the digital age. What began as a small team of passionate developers has grown into 
              a full-service digital agency serving clients worldwide.
            </p>
            <p>
              Over the years, we've had the privilege of working with startups, SMEs, and Fortune 500 
              companies, delivering innovative solutions that drive real business results. Our expertise 
              spans web development, mobile applications, UI/UX design, and digital marketing.
            </p>
            <p>
              Today, we're proud to have a diverse team of 50+ talented professionals who share our 
              commitment to excellence, innovation, and client success. Every project we undertake is 
              an opportunity to push boundaries and create something extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #1e3a8a 100%)',
        color: 'white',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: '3rem',
            fontFamily: 'Poppins, sans-serif',
          }}>
            Why Choose Nexora?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { title: 'Expert Team', desc: 'Skilled professionals with years of industry experience' },
              { title: 'Quality Focused', desc: 'We never compromise on quality and attention to detail' },
              { title: 'On-Time Delivery', desc: 'We respect deadlines and deliver projects on schedule' },
              { title: 'Client-Centric', desc: 'Your success is our success - we put clients first' },
              { title: 'Innovative Solutions', desc: 'Cutting-edge technology and creative approaches' },
              { title: 'Ongoing Support', desc: 'Continuous support and maintenance after launch' }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '2rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.9375rem',
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 2rem',
        background: 'white',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: '1.5rem',
            fontFamily: 'Poppins, sans-serif',
          }}>
            Ready to Start Your Project?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#64748b',
            marginBottom: '2.5rem',
            lineHeight: '1.7',
          }}>
            Let's work together to bring your vision to life. Get in touch with us today 
            and discover how we can help your business grow.
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#contact';
              }
            }}
            style={{
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(249, 115, 22, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(249, 115, 22, 0.3)';
            }}
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
