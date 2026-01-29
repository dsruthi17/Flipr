import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader, Image as ImageIcon, Star } from 'lucide-react';
import { getClients, createClient, deleteClient } from '../../api';
import ImageCropModal from './ImageCropModal';
import { readFile } from '../../utils/cropImage';

function ClientManager() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    rating: 5,
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setShowCropModal(true);
    }
  };

  const handleCropComplete = (croppedFile) => {
    setFormData({ ...formData, image: croppedFile });
    setPreview(URL.createObjectURL(croppedFile));
    setShowCropModal(false);
    setImageSrc(null);
  };

  const handleCropCancel = () => {
    setShowCropModal(false);
    setImageSrc(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('designation', formData.designation);
    data.append('description', formData.description);
    data.append('rating', formData.rating);
    if (formData.image) data.append('image', formData.image);

    try {
      await createClient(data);
      setFormData({ name: '', designation: '', description: '', rating: 5, image: null });
      setPreview(null);
      loadClients();
    } catch (error) {
      alert('Error creating client');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this client?')) {
      try {
        await deleteClient(id);
        loadClients();
      } catch (error) {
        alert('Error deleting client');
      }
    }
  };

  return (
    <div>
      {/* Add Client Form */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        marginBottom: '2rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
          Add New Client Testimonial
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Client Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '1rem',
              }}
            />
            <input
              type="text"
              placeholder="Designation"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              required
              style={{
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '1rem',
              }}
            />
            <textarea
              placeholder="Testimonial"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              style={{
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit',
              }}
            />
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Rating: {formData.rating}
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    fill={star <= formData.rating ? '#f97316' : 'none'}
                    color={star <= formData.rating ? '#f97316' : '#cbd5e1'}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                border: '2px dashed #e2e8f0',
                borderRadius: '0.5rem',
                cursor: 'pointer',
              }}>
                <ImageIcon size={20} />
                <span>{formData.image ? formData.image.name : 'Choose Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
              {preview && (
                <img src={preview} alt="Preview" style={{
                  marginTop: '1rem',
                  maxWidth: '100px',
                  borderRadius: '50%',
                }} />
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '0.75rem 1.5rem',
              background: submitting ? '#cbd5e1' : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: submitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Plus size={20} />
            {submitting ? 'Adding...' : 'Add Client'}
          </button>
        </form>
      </div>

      {/* Clients List */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
          All Clients ({clients.length})
        </h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Loader size={32} className="animate-spin" color="#f97316" />
          </div>
        ) : clients.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
            No clients yet. Add your first testimonial above!
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {clients.map((client) => (
              <div
                key={client._id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  alignItems: 'center',
                }}
              >
                {client.image && (
                  <img
                    src={`http://localhost:5000${client.image}`}
                    alt={client.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    {client.name}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {client.designation}
                  </p>
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem' }}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < client.rating ? '#f97316' : 'none'}
                        color={i < client.rating ? '#f97316' : '#cbd5e1'}
                      />
                    ))}
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.875rem' }} className="line-clamp-2">
                    {client.description}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(client._id)}
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
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Crop Modal */}
      {showCropModal && (
        <ImageCropModal
          imageSrc={imageSrc}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          fileName={selectedFileName}
        />
      )}
    </div>
  );
}

export default ClientManager;
