import express from 'express';
import {
  generateCustomizedResume,
  extractJobKeywords,
  improveBulletPoints,
  suggestMissingSkills,
  improveSummary,
  getResumeImprovementSuggestions
} from '../services/aiService.js';

const router = express.Router();

// Generate customized resume based on job description
router.post('/generate-customized', async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!resumeData || !jobDescription) {
      return res.status(400).json({
        error: 'Resume data and job description are required'
      });
    }

    const customized = await generateCustomizedResume(resumeData, jobDescription);
    res.json(customized);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Extract keywords from job description
router.post('/extract-keywords', async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    const keywords = await extractJobKeywords(jobDescription);
    res.json(keywords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Improve specific bullet point
router.post('/improve-bullet-point', async (req, res) => {
  try {
    const { bulletPoint, jobDescription } = req.body;

    if (!bulletPoint || !jobDescription) {
      return res.status(400).json({
        error: 'Bullet point and job description are required'
      });
    }

    const improved = await improveBulletPoints(bulletPoint, jobDescription);
    res.json({ improvedBulletPoint: improved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Suggest missing skills
router.post('/suggest-skills', async (req, res) => {
  try {
    const { currentSkills, jobDescription } = req.body;

    if (!currentSkills || !jobDescription) {
      return res.status(400).json({
        error: 'Current skills and job description are required'
      });
    }

    const suggestions = await suggestMissingSkills(currentSkills, jobDescription);
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Improve professional summary
router.post('/improve-summary', async (req, res) => {
  try {
    const { summary } = req.body;

    if (!summary) {
      return res.status(400).json({ error: 'Summary is required' });
    }

    const improved = await improveSummary(summary);
    res.json({ improvedSummary: improved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comprehensive improvement suggestions
router.post('/get-suggestions', async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!resumeData || !jobDescription) {
      return res.status(400).json({
        error: 'Resume data and job description are required'
      });
    }

    const suggestions = await getResumeImprovementSuggestions(resumeData, jobDescription);
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
