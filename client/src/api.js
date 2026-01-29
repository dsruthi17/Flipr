const API_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// PROJECTS API
export const getProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);
  return handleResponse(response);
};

export const createProject = async (formData) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    body: formData
  });
  return handleResponse(response);
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
};

// CLIENTS API
export const getClients = async () => {
  const response = await fetch(`${API_URL}/clients`);
  return handleResponse(response);
};

export const createClient = async (formData) => {
  const response = await fetch(`${API_URL}/clients`, {
    method: 'POST',
    body: formData
  });
  return handleResponse(response);
};

export const deleteClient = async (id) => {
  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
};

// CONTACTS API
export const getContacts = async () => {
  const response = await fetch(`${API_URL}/contacts`);
  return handleResponse(response);
};

export const submitContact = async (contactData) => {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contactData)
  });
  return handleResponse(response);
};

export const deleteContact = async (id) => {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
};

// SUBSCRIBERS API
export const getSubscribers = async () => {
  const response = await fetch(`${API_URL}/subscribers`);
  return handleResponse(response);
};

export const subscribe = async (email) => {
  const response = await fetch(`${API_URL}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });
  return handleResponse(response);
};

export const deleteSubscriber = async (id) => {
  const response = await fetch(`${API_URL}/subscribers/${id}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
};
