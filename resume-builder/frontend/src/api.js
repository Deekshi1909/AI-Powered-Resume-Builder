import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Resume APIs
export const resumeAPI = {
  createResume: (resumeData) => api.post('/resume/create', resumeData),
  getResume: (resumeId) => api.get(`/resume/${resumeId}`),
  getUserResumes: (userId) => api.get(`/resume/user/${userId}`),
  updateResume: (resumeId, resumeData) => api.put(`/resume/${resumeId}`, resumeData),
  deleteResume: (resumeId) => api.delete(`/resume/${resumeId}`),
  calculateATS: (data) => api.post('/resume/ats-score', data),
  generatePDF: (resumeData) => api.post('/resume/generate-pdf', resumeData)
};

// AI APIs
export const aiAPI = {
  generateCustomized: (data) => api.post('/ai/generate-customized', data),
  extractKeywords: (data) => api.post('/ai/extract-keywords', data),
  improveBulletPoint: (data) => api.post('/ai/improve-bullet-point', data),
  suggestSkills: (data) => api.post('/ai/suggest-skills', data),
  improveSummary: (data) => api.post('/ai/improve-summary', data),
  getSuggestions: (data) => api.post('/ai/get-suggestions', data)
};

// File APIs
export const fileAPI = {
  uploadFile: (formData) => api.post('/file/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  extractText: (data) => api.post('/file/extract-text', data)
};

// Community APIs
export const communityAPI = {
  uploadResume: (data) => api.post('/community/upload', data),
  getAll: () => api.get('/community'),
  getById: (resumeId) => api.get(`/community/${resumeId}`),
  search: (query) => api.get(`/community/search/${query}`)
};

export default api;
