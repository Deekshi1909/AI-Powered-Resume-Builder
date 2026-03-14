// Frontend File Processing Utilities

/**
 * Frontend File Processor Service
 * Handles client-side file reading and processing
 */
class FileProcessor {
  /**
   * Read file content as text
   * @param {File} file - File object from input
   * @returns {Promise<string>} - File content as text
   */
  async readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  /**
   * Parse resume text into structured data
   * @param {string} text - Resume text content
   * @returns {Object} - Parsed resume data
   */
  parseResumeText(text) {
    return {
      personalInfo: this.extractPersonalInfo(text),
      experience: this.extractExperience(text),
      education: this.extractEducation(text),
      skills: this.extractSkills(text),
      certifications: this.extractCertifications(text)
    };
  }

  /**
   * Extract personal information from text
   */
  extractPersonalInfo(text) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /(\+\d{1,3})?\s?(\d{3}|\(\d{3}\))[-.\s]?\d{3}[-.\s]?\d{4}/;

    return {
      email: text.match(emailRegex)?.[0] || '',
      phone: text.match(phoneRegex)?.[0] || '',
      summary: text.split('\n').slice(0, 3).join(' ').substring(0, 200)
    };
  }

  /**
   * Extract experience from text
   */
  extractExperience(text) {
    const sections = text.split(/\bEXPERIENCE\b/i);
    if (sections.length < 2) return [];

    const experienceText = sections[1].split(/\b(EDUCATION|SKILLS|PROJECTS|CERTIFICATIONS)\b/i)[0];
    const experiences = [];

    const jobs = experienceText.match(/[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s*(?:at|@|-)\s*[A-Z][a-z\s]+/g) || [];
    
    jobs.forEach(job => {
      const parts = job.split(/(?:at|@|-)/i).map(s => s.trim());
      experiences.push({
        position: parts[0] || 'Position',
        company: parts[1] || 'Company',
        description: '',
        responsibilities: []
      });
    });

    return experiences;
  }

  /**
   * Extract education from text
   */
  extractEducation(text) {
    const sections = text.split(/\bEDUCATION\b/i);
    if (sections.length < 2) return [];

    const educationText = sections[1].split(/\b(EXPERIENCE|SKILLS|PROJECTS|CERTIFICATIONS)\b/i)[0];
    const degrees = educationText.match(/(?:Bachelor|Master|PhD|Associate|Diploma|Certificate).*?(?:in|of)?\s*[A-Za-z\s,]+/gi) || [];

    return degrees.map(degree => ({
      degree: degree.trim().split('in')[0].trim(),
      field: degree.split('in')[1]?.trim() || '',
      school: '',
      graduationYear: new Date().getFullYear()
    }));
  }

  /**
   * Extract skills from text
   */
  extractSkills(text) {
    const sections = text.split(/\bSKILLS\b/i);
    if (sections.length < 2) return [];

    const skillsText = sections[1].split(/\b(EXPERIENCE|EDUCATION|PROJECTS|CERTIFICATIONS)\b/i)[0];
    const skills = skillsText
      .split(/[,•\n-]/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length < 50)
      .slice(0, 20);

    return skills.map(skill => ({
      name: skill,
      proficiency: 'Intermediate'
    }));
  }

  /**
   * Extract certifications from text
   */
  extractCertifications(text) {
    const sections = text.split(/\bCERTIFICATIONS\b/i);
    if (sections.length < 2) return [];

    const certText = sections[1].split(/\b(EXPERIENCE|EDUCATION|SKILLS|PROJECTS)\b/i)[0];
    const certs = certText
      .split(/[,•\n-]/)
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
