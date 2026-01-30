import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader, Image as ImageIcon } from 'lucide-react';
import { getProjects, createProject, deleteProject, API_URL } from '../../api';
import ImageCropModal from './ImageCropModal';
import { readFile } from '../../utils/cropImage';

function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '', image: null });
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
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
    data.append('description', formData.description);
    if (formData.image) data.append('image', formData.image);

    try {
      await createProject(data);
      setFormData({ name: '', description: '', image: null });
      setPreview(null);
      loadProjects();
    } catch (error) {
      alert('Error creating project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this project?')) {
      try {
        await deleteProject(id);
        loadProjects();
      } catch (error) {
        alert('Error deleting project');
      }
    }
  };

  return (
    <div>
      {/* Add Project Form */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        marginBottom: '2rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
          Add New Project
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Project Name"
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
            <textarea
              placeholder="Description"
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
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                border: '2px dashed #e2e8f0',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#f97316'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
              >
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
                  maxWidth: '200px',
                  borderRadius: '0.5rem',
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
            {submitting ? 'Adding...' : 'Add Project'}
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
          All Projects ({projects.length})
        </h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Loader size={32} className="animate-spin" color="#f97316" />
          </div>
        ) : projects.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
            No projects yet. Add your first project above!
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  alignItems: 'center',
                }}
              >
                {project.image && (
                  <img
                    src={`${API_URL}${project.image}`}
                    alt={project.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    {project.name}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.875rem' }} className="line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(project.id)}
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

export default ProjectManager;
