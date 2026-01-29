const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getProjects = async () => {
  const response = await fetch(`${API_URL}/api/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};

export const createProject = async (formData) => {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to create project');
  return response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return response.json();
};

export const getClients = async () => {
  const response = await fetch(`${API_URL}/api/clients`);
  if (!response.ok) throw new Error('Failed to fetch clients');
  return response.json();
};

export const createClient = async (formData) => {
  const response = await fetch(`${API_URL}/api/clients`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to create client');
  return response.json();
};

export const deleteClient = async (id) => {
  const response = await fetch(`${API_URL}/api/clients/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete client');
  return response.json();
};

export const getContacts = async () => {
  const response = await fetch(`${API_URL}/api/contacts`);
  if (!response.ok) throw new Error('Failed to fetch contacts');
  return response.json();
};

export const submitContact = async (data) => {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to submit contact');
  return response.json();
};

export const deleteContact = async (id) => {
  const response = await fetch(`${API_URL}/api/contacts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete contact');
  return response.json();
};

export const getSubscribers = async () => {
  const response = await fetch(`${API_URL}/api/subscribers`);
  if (!response.ok) throw new Error('Failed to fetch subscribers');
  return response.json();
};

export const subscribe = async (email) => {
  const response = await fetch(`${API_URL}/api/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error('Failed to subscribe');
  return response.json();
};

export const deleteSubscriber = async (id) => {
  const response = await fetch(`${API_URL}/api/subscribers/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete subscriber');
  return response.json();
};
