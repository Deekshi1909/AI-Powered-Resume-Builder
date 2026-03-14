import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import fileProcessor from '../services/fileProcessor.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Upload and process file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const extractedText = await fileProcessor.processUploadedFile(
      req.file.path,
      req.file.mimetype
    );

    // Parse the extracted text into resume structure
    const parsedResume = fileProcessor.parseResumeText(extractedText);

    res.json({
      success: true,
      fileName: req.file.filename,
      extractedText,
      parsedResume
    });
  } catch (error) {
    // Clean up file on error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    res.status(400).json({ error: error.message });
  }
});

// Extract text from specific uploaded file
router.post('/extract-text', async (req, res) => {
  try {
    const { fileName } = req.body;

    if (!fileName) {
      return res.status(400).json({ error: 'File name is required' });
    }

    const filePath = path.join(__dirname, '../uploads', fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const mimeType = req.body.mimeType || 'application/pdf';
    const extractedText = await fileProcessor.processUploadedFile(filePath, mimeType);

    res.json({
      success: true,
      extractedText
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
