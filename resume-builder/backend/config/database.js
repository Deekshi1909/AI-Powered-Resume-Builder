import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const RESUMES_FILE = path.join(DATA_DIR, 'resumes.json');
const COMMUNITY_FILE = path.join(DATA_DIR, 'community.json');

// Initialize data directory and files if they don't exist
const initializeDB = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
  }

  if (!fs.existsSync(RESUMES_FILE)) {
    fs.writeFileSync(RESUMES_FILE, JSON.stringify({ resumes: [] }, null, 2));
  }

  if (!fs.existsSync(COMMUNITY_FILE)) {
    fs.writeFileSync(COMMUNITY_FILE, JSON.stringify({ community: [] }, null, 2));
  }
};

const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return {};
  }
};

const writeJSON = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
};

const saveUser = (user) => {
  const data = readJSON(USERS_FILE);
  user.id = user.id || Date.now().toString();
  user.createdAt = user.createdAt || new Date().toISOString();
  
  const existingIndex = data.users.findIndex(u => u.id === user.id);
  if (existingIndex > -1) {
    data.users[existingIndex] = { ...data.users[existingIndex], ...user };
  } else {
    data.users.push(user);
  }
  
  writeJSON(USERS_FILE, data);
  return user;
};

const getUser = (userId) => {
  const data = readJSON(USERS_FILE);
  return data.users.find(u => u.id === userId);
};

const saveResume = (resume) => {
  const data = readJSON(RESUMES_FILE);
  resume.id = resume.id || Date.now().toString();
  resume.createdAt = resume.createdAt || new Date().toISOString();
  
  const existingIndex = data.resumes.findIndex(r => r.id === resume.id);
  if (existingIndex > -1) {
    data.resumes[existingIndex] = { ...data.resumes[existingIndex], ...resume };
  } else {
    data.resumes.push(resume);
  }
  
  writeJSON(RESUMES_FILE, data);
  return resume;
};

const getResume = (resumeId) => {
  const data = readJSON(RESUMES_FILE);
  return data.resumes.find(r => r.id === resumeId);
};

const getUserResumes = (userId) => {
  const data = readJSON(RESUMES_FILE);
  return data.resumes.filter(r => r.userId === userId);
};

const saveCommunityResume = (resume) => {
  const data = readJSON(COMMUNITY_FILE);
  resume.id = resume.id || Date.now().toString();
  resume.uploadedAt = resume.uploadedAt || new Date().toISOString();
  data.community.push(resume);
  writeJSON(COMMUNITY_FILE, data);
  return resume;
};

const getCommunityResumes = () => {
  const data = readJSON(COMMUNITY_FILE);
  return data.community.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
};

// Initialize database on import
initializeDB();

export {
  saveUser,
  getUser,
  saveResume,
  getResume,
  getUserResumes,
  saveCommunityResume,
  getCommunityResumes
};
