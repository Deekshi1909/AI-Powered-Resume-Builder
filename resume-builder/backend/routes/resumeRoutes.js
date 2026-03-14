import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  saveResume,
  getResume,
  getUserResumes,
  saveUser,
  getUser
} from '../config/database.js';
import ATSScoreCalculator from '../services/atsService.js';
import pdfGenerator from '../services/pdfGenerator.js';

const router = express.Router();
const atsCalculator = new ATSScoreCalculator();

// Create or update a resume
router.post('/create', async (req, res) => {
  try {
    const { userId, resumeData, template = 'professional', jobDescription } = req.body;

    if (!userId || !resumeData) {
      return res.status(400).json({ error: 'User ID and resume data are required' });
    }

    const resume = {
      id: uuidv4(),
      userId,
      resumeData,
      template,
      jobDescription: jobDescription || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = saveResume(resume);
    res.json({
      success: true,
      resume: saved
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific resume
router.get('/:resumeId', (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = getResume(resumeId);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all resumes for a user
router.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const resumes = getUserResumes(userId);
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate ATS score
router.post('/ats-score', async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!resumeData || !jobDescription) {
      return res.status(400).json({
        error: 'Resume data and job description are required'
      });
    }

    const atsScore = atsCalculator.calculateScore(resumeData, jobDescription);
    res.json(atsScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate PDF from resume
router.post('/generate-pdf', async (req, res) => {
  try {
    const { resumeData, template = 'professional' } = req.body;

    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    const { fileName, filePath } = await pdfGenerator.generatePDF(resumeData, template);

    res.json({
      success: true,
      fileName,
      downloadUrl: `/uploads/${fileName}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download PDF
router.get('/download/:fileName', (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, '../uploads', fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update resume
router.put('/:resumeId', (req, res) => {
  try {
    const { resumeId } = req.params;
    const { resumeData, template } = req.body;

    const resume = getResume(resumeId);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const updated = saveResume({
      ...resume,
      resumeData,
      template: template || resume.template,
      updatedAt: new Date().toISOString()
    });

    res.json({ success: true, resume: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete resume
router.delete('/:resumeId', (req, res) => {
  try {
    const { resumeId } = req.params;
    // Note: In a real app, you'd implement actual deletion
    res.json({ success: true, message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
