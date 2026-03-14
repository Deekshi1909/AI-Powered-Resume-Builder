import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { saveCommunityResume, getCommunityResumes } from '../config/database.js';

const router = express.Router();

// Upload resume to community
router.post('/upload', (req, res) => {
  try {
    const { resumeData, userId, userName, jobTitle, company, feedback } = req.body;

    if (!resumeData || !userName) {
      return res.status(400).json({
        error: 'Resume data and user name are required'
      });
    }

    const communityResume = {
      id: uuidv4(),
      userId,
      userName,
      jobTitle: jobTitle || '',
      company: company || '',
      resumeData,
      feedback: feedback || '',
      uploadedAt: new Date().toISOString(),
      views: 0,
      upvotes: 0
    };

    const saved = saveCommunityResume(communityResume);
    res.json({
      success: true,
      resume: saved
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all community resumes
router.get('/', (req, res) => {
  try {
    const resumes = getCommunityResumes();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get community resume by ID with increased views
router.get('/:resumeId', (req, res) => {
  try {
    const { resumeId } = req.params;
    const resumes = getCommunityResumes();
    const resume = resumes.find(r => r.id === resumeId);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Update views (in real app, persist this)
    resume.views = (resume.views || 0) + 1;

    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search community resumes
router.get('/search/:query', (req, res) => {
  try {
    const { query } = req.params;
    const resumes = getCommunityResumes();

    const filtered = resumes.filter(resume =>
      resume.jobTitle?.toLowerCase().includes(query.toLowerCase()) ||
      resume.company?.toLowerCase().includes(query.toLowerCase()) ||
      resume.userName?.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
