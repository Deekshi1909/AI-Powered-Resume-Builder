import Tesseract from 'tesseract.js';
import pdf from 'pdf-parse';
import sharp from 'sharp';
import fs from 'fs';

class FileProcessor {
  async extractTextFromPDF(filePath) {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const data = await pdf(fileBuffer);
      return data.text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to process PDF file');
    }
  }

  async extractTextFromImage(filePath) {
    try {
      const result = await Tesseract.recognize(
        filePath,
        'eng',
        {
          logger: m => console.log('OCR Progress:', m)
        }
      );
      return result.data.text;
    } catch (error) {
      console.error('Error extracting text from image:', error);
      throw new Error('Failed to process image file');
    }
  }

  async compressImage(filePath, outputPath) {
    try {
      await sharp(filePath)
        .resize(1920, 1080, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .toFile(outputPath);
      return outputPath;
    } catch (error) {
      console.error('Error compressing image:', error);
      throw new Error('Failed to compress image');
    }
  }

  async processUploadedFile(filePath, fileType) {
    try {
      if (fileType === 'application/pdf') {
        return await this.extractTextFromPDF(filePath);
      } else if (fileType.startsWith('image/')) {
        return await this.extractTextFromImage(filePath);
      } else if (fileType === 'text/plain') {
        return fs.readFileSync(filePath, 'utf-8');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      throw error;
    }
  }

  // Parse resume text into structured data
  parseResumeText(text) {
    return {
      personalInfo: this.extractPersonalInfo(text),
      experience: this.extractExperience(text),
      education: this.extractEducation(text),
      skills: this.extractSkills(text),
      certifications: this.extractCertifications(text)
    };
  }

  extractPersonalInfo(text) {
    // Simple extraction - can be enhanced with NLP
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /(\+\d{1,3})?\s?(\d{3}|\(\d{3}\))[-.\s]?\d{3}[-.\s]?\d{4}/;

    return {
      email: text.match(emailRegex)?.[0] || '',
      phone: text.match(phoneRegex)?.[0] || '',
      summary: text.split('\n').slice(0, 3).join(' ').substring(0, 200)
    };
  }

  extractExperience(text) {
    const sections = text.split(/\bEXPERIENCE\b/i);
    if (sections.length < 2) return [];

    const experienceText = sections[1].split(/\b(EDUCATION|SKILLS|PROJECTS|CERTIFICATIONS)\b/i)[0];
    const experiences = [];

    // Very simple parsing - can be enhanced
    const jobs = experienceText.match(/[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s*(?:at|@|-)\s*[A-Z][a-z\s]+/g) || [];
    
    jobs.forEach(job => {
      const [position, company] = job.split(/(?:at|@|-)/i).map(s => s.trim());
      experiences.push({
        position: position || 'Position',
        company: company || 'Company',
        description: '',
        responsibilities: []
      });
    });

    return experiences;
  }

  extractEducation(text) {
    const sections = text.split(/\bEDUCATION\b/i);
    if (sections.length < 2) return [];

    const educationText = sections[1].split(/\b(EXPERIENCE|SKILLS|PROJECTS|CERTIFICATIONS)\b/i)[0];
    const degrees = educationText.match(/(?:Bachelor|Master|PhD|Associate|Diploma|Certificate)'?s?\s*(?:in|of)?\s*[A-Za-z\s,]+/gi) || [];

    return degrees.map(degree => ({
      degree: degree.trim(),
      field: '',
      school: '',
      graduationYear: new Date().getFullYear()
    }));
  }

  extractSkills(text) {
    const sections = text.split(/\bSKILLS\b/i);
    if (sections.length < 2) return [];

    const skillsText = sections[1].split(/\b(EXPERIENCE|EDUCATION|PROJECTS|CERTIFICATIONS)\b/i)[0];
    const skills = skillsText
      .split(/[,•\n\-]/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length < 50)
      .slice(0, 20);

    return skills.map(skill => ({
      name: skill,
      proficiency: 'Intermediate'
    }));
  }

  extractCertifications(text) {
    const sections = text.split(/\bCERTIFICATIONS\b/i);
    if (sections.length < 2) return [];

    const certText = sections[1].split(/\b(EXPERIENCE|EDUCATION|SKILLS|PROJECTS)\b/i)[0];
    const certs = certText
      .split(/[,•\n\-]/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .slice(0, 10);

    return certs.map(cert => ({
      name: cert,
      issuingOrganization: '',
      issueDate: new Date().getFullYear()
    }));
  }
}

export default new FileProcessor();
