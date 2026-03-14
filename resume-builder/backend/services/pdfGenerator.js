import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ResumeGenerator {
  constructor() {
    this.templates = {
      modern: this.generateModernTemplate,
      professional: this.generateProfessionalTemplate,
      minimal: this.generateMinimalTemplate
    };

    this.pageWidth = 612; // 8.5 inches
    this.pageHeight = 792; // 11 inches
    this.marginLeft = 40;
    this.marginRight = 40;
    this.marginTop = 40;
    this.marginBottom = 40;
  }

  generatePDF(resumeData, template = 'professional') {
    return new Promise((resolve, reject) => {
      try {
        const fileName = `resume_${Date.now()}.pdf`;
        const filePath = path.join(__dirname, '../uploads', fileName);

        // Ensure uploads directory exists
        if (!fs.existsSync(path.join(__dirname, '../uploads'))) {
          fs.mkdirSync(path.join(__dirname, '../uploads'), { recursive: true });
        }

        const doc = new PDFDocument({
          size: 'Letter',
          margin: 40
        });

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Apply template
        const templateFunc = this.templates[template] || this.templates.professional;
        templateFunc.call(this, doc, resumeData);

        doc.end();

        stream.on('finish', () => {
          resolve({ fileName, filePath });
        });

        stream.on('error', (error) => {
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  generateProfessionalTemplate(doc, data) {
    let yPosition = 40;

    // Header with name and contact
    doc.fontSize(24).font('Helvetica-Bold').text(data.personalInfo?.name || 'Your Name', 40, yPosition);
    yPosition += 30;

    const contactInfo = [
      data.personalInfo?.email,
      data.personalInfo?.phone,
      data.personalInfo?.location
    ].filter(Boolean).join(' • ');

    doc.fontSize(10).font('Helvetica').text(contactInfo, 40, yPosition);
    yPosition += 15;

    // Summary
    if (data.personalInfo?.summary) {
      doc.moveTo(40, yPosition).lineTo(572, yPosition).stroke();
      yPosition += 10;

      doc.fontSize(12).font('Helvetica-Bold').text('PROFESSIONAL SUMMARY', 40, yPosition);
      yPosition += 15;

      doc.fontSize(10).font('Helvetica').text(data.personalInfo.summary, 40, yPosition, {
        width: 532,
        align: 'left'
      });
      yPosition += doc.heightOfString(data.personalInfo.summary, { width: 532 }) + 15;
    }

    // Experience
    if (data.experience && data.experience.length > 0) {
      doc.moveTo(40, yPosition).lineTo(572, yPosition).stroke();
      yPosition += 10;

      doc.fontSize(12).font('Helvetica-Bold').text('EXPERIENCE', 40, yPosition);
      yPosition += 15;

      data.experience.forEach((exp, index) => {
        if (yPosition > 700) {
          doc.addPage();
          yPosition = 40;
        }

        doc.fontSize(11).font('Helvetica-Bold').text(exp.position, 40, yPosition);
        doc.fontSize(10).font('Helvetica').text(`${exp.company} | ${exp.startDate || ''} to ${exp.endDate || 'Present'}`, 40, yPosition + 15);
        yPosition += 35;

        if (exp.responsibilities && Array.isArray(exp.responsibilities)) {
          exp.responsibilities.forEach(resp => {
            if (yPosition > 700) {
              doc.addPage();
              yPosition = 40;
            }
            doc.fontSize(10).font('Helvetica').text(`• ${resp}`, 50, yPosition, { width: 492 });
            yPosition += doc.heightOfString(`• ${resp}`, { width: 492 }) + 5;
          });
        }

        yPosition += 10;
      });
    }

    // Education
    if (data.education && data.education.length > 0) {
      if (yPosition > 700) {
        doc.addPage();
        yPosition = 40;
      }

      doc.moveTo(40, yPosition).lineTo(572, yPosition).stroke();
      yPosition += 10;

      doc.fontSize(12).font('Helvetica-Bold').text('EDUCATION', 40, yPosition);
      yPosition += 15;

      data.education.forEach(edu => {
        if (yPosition > 700) {
          doc.addPage();
          yPosition = 40;
        }

        doc.fontSize(11).font('Helvetica-Bold').text(edu.degree, 40, yPosition);
        doc.fontSize(10).font('Helvetica').text(`${edu.school} | Graduated: ${edu.graduationYear}`, 40, yPosition + 15);
        yPosition += 35;
      });
    }

    // Skills
    if (data.skills && data.skills.length > 0) {
      if (yPosition > 700) {
        doc.addPage();
        yPosition = 40;
      }

      doc.moveTo(40, yPosition).lineTo(572, yPosition).stroke();
      yPosition += 10;

      doc.fontSize(12).font('Helvetica-Bold').text('SKILLS', 40, yPosition);
      yPosition += 15;

      const skillTexts = data.skills.map(s => (typeof s === 'string' ? s : s.name)).join(', ');
      doc.fontSize(10).font('Helvetica').text(skillTexts, 40, yPosition, { width: 532 });
      yPosition += doc.heightOfString(skillTexts, { width: 532 }) + 10;
    }

    // Certifications
    if (data.certifications && data.certifications.length > 0) {
      if (yPosition > 700) {
        doc.addPage();
        yPosition = 40;
      }

      doc.moveTo(40, yPosition).lineTo(572, yPosition).stroke();
      yPosition += 10;

      doc.fontSize(12).font('Helvetica-Bold').text('CERTIFICATIONS', 40, yPosition);
      yPosition += 15;

      data.certifications.forEach(cert => {
        doc.fontSize(10).font('Helvetica').text(`• ${typeof cert === 'string' ? cert : cert.name}`, 50, yPosition);
        yPosition += 15;
      });
    }
  }

  generateModernTemplate(doc, data) {
    // Modern template with colors and sections
    let yPosition = 40;

    // Header background
    doc.fillColor('#2C3E50').rect(0, 0, 612, 80).fill();

    // Name and contact
    doc.fontSize(22).font('Helvetica-Bold').fillColor('#FFFFFF').text(data.personalInfo?.name || 'Your Name', 40, 15);

    const contactInfo = [
      data.personalInfo?.email,
      data.personalInfo?.phone,
      data.personalInfo?.location
    ].filter(Boolean).join(' • ');

    doc.fontSize(9).fillColor('#ECF0F1').text(contactInfo, 40, 40);

    yPosition = 95;

    // Summary
    if (data.personalInfo?.summary) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#2C3E50').text('PROFESSIONAL SUMMARY', 40, yPosition);
      yPosition += 15;

      doc.fontSize(9).font('Helvetica').fillColor('#34495E').text(data.personalInfo.summary, 40, yPosition, {
        width: 532,
        align: 'left'
      });
      yPosition += doc.heightOfString(data.personalInfo.summary, { width: 532 }) + 15;
    }

    // Experience
    if (data.experience && data.experience.length > 0) {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#2C3E50').text('EXPERIENCE', 40, yPosition);
      yPosition += 15;

      data.experience.forEach(exp => {
        if (yPosition > 700) {
          doc.addPage();
          yPosition = 40;
        }

        doc.fontSize(10).font('Helvetica-Bold').fillColor('#2C3E50').text(exp.position, 40, yPosition);
        doc.fontSize(9).fillColor('#7F8C8D').text(exp.company, 40, yPosition + 15);
        yPosition += 35;

        if (exp.responsibilities) {
          exp.responsibilities.forEach(resp => {
            doc.fontSize(9).fillColor('#34495E').text(`• ${resp}`, 50, yPosition, { width: 492 });
            yPosition += doc.heightOfString(`• ${resp}`, { width: 492 }) + 3;
          });
        }

        yPosition += 10;
      });
    }

    // Skills
    if (data.skills && data.skills.length > 0) {
      if (yPosition > 700) {
        doc.addPage();
        yPosition = 40;
      }

      doc.fontSize(12).font('Helvetica-Bold').fillColor('#2C3E50').text('SKILLS', 40, yPosition);
      yPosition += 15;

      const skillTexts = data.skills.map(s => (typeof s === 'string' ? s : s.name)).slice(0, 15);
      const skillString = skillTexts.join(', ');

      doc.fontSize(9).fillColor('#34495E').text(skillString, 40, yPosition, { width: 532 });
      yPosition += doc.heightOfString(skillString, { width: 532 });
    }
  }

  generateMinimalTemplate(doc, data) {
    // Clean, minimal design
    let yPosition = 40;

    // Name
    doc.fontSize(20).font('Helvetica-Bold').text(data.personalInfo?.name || 'Your Name', 40, yPosition);
    yPosition += 28;

    // Contact
    const contactInfo = [
      data.personalInfo?.email,
      data.personalInfo?.phone,
      data.personalInfo?.location
    ].filter(Boolean).join(' | ');

    doc.fontSize(9).font('Helvetica').text(contactInfo, 40, yPosition);
    yPosition += 20;

    // Horizontal line
    doc.moveTo(40, yPosition).lineTo(572, yPosition).stroke();
    yPosition += 15;

    // Summary
    if (data.personalInfo?.summary) {
      doc.fontSize(10).font('Helvetica').text(data.personalInfo.summary, 40, yPosition, {
        width: 532,
        align: 'justify'
      });
      yPosition += doc.heightOfString(data.personalInfo.summary, { width: 532 }) + 15;
    }

    // Experience
    if (data.experience && data.experience.length > 0) {
      yPosition += 5;
      doc.fontSize(11).font('Helvetica-Bold').text('EXPERIENCE', 40, yPosition);
      yPosition += 12;

      data.experience.forEach(exp => {
        if (yPosition > 700) {
          doc.addPage();
          yPosition = 40;
        }

        doc.fontSize(10).font('Helvetica-Bold').text(exp.position, 40, yPosition);
        doc.fontSize(9).text(exp.company + ' — ' + (exp.startDate || '') + ' to ' + (exp.endDate || 'Present'), 40, yPosition + 13);
        yPosition += 30;

        if (exp.responsibilities) {
          exp.responsibilities.slice(0, 3).forEach(resp => {
            doc.fontSize(9).text(`• ${resp}`, 50, yPosition, { width: 492 });
            yPosition += doc.heightOfString(`• ${resp}`, { width: 492 }) + 2;
          });
        }

        yPosition += 8;
      });
    }

    // Education
    if (data.education && data.education.length > 0) {
      if (yPosition > 700) {
        doc.addPage();
        yPosition = 40;
      }

      yPosition += 5;
      doc.fontSize(11).font('Helvetica-Bold').text('EDUCATION', 40, yPosition);
      yPosition += 12;

      data.education.forEach(edu => {
        doc.fontSize(10).font('Helvetica-Bold').text(edu.degree, 40, yPosition);
        doc.fontSize(9).text(edu.school, 40, yPosition + 13);
        yPosition += 28;
      });
    }

    // Skills
    if (data.skills && data.skills.length > 0) {
      if (yPosition > 700) {
        doc.addPage();
        yPosition = 40;
      }

      yPosition += 5;
      doc.fontSize(11).font('Helvetica-Bold').text('SKILLS', 40, yPosition);
      yPosition += 12;

      const skillTexts = data.skills.map(s => (typeof s === 'string' ? s : s.name)).join(' • ');
      doc.fontSize(9).text(skillTexts, 40, yPosition, { width: 532 });
    }
  }
}

export default new ResumeGenerator();
