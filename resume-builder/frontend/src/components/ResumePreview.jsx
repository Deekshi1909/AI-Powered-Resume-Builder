import React, { useState, useContext } from 'react';
import { FiSave, FiDownload, FiFileText } from 'react-icons/fi';
import { ResumeContext } from '../context/ResumeContext';
import { resumeAPI } from '../api';

const ResumePreview = ({ resumeData, template = 'professional' }) => {
  const { updateResume } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setLoading(true);
      const response = await resumeAPI.generatePDF({ resumeData, template });
      const link = document.createElement('a');
      link.href = response.data.downloadUrl;
      link.download = 'resume.pdf';
      link.click();
    } catch (error) {
      alert('Error generating PDF: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderProfessionalTemplate = () => (
    <div className="bg-white p-12 font-serif text-gray-800">
      {/* Header */}
      <div className="border-b-2 border-primary pb-4 mb-6">
        <h1 className="text-4xl font-bold text-primary">{resumeData.personalInfo?.name || 'Your Name'}</h1>
        <div className="text-sm mt-2 text-gray-600">
          {resumeData.personalInfo?.email && <span>{resumeData.personalInfo.email} • </span>}
          {resumeData.personalInfo?.phone && <span>{resumeData.personalInfo.phone} • </span>}
          {resumeData.personalInfo?.location && <span>{resumeData.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-primary border-b border-primary pb-2 mb-3">PROFESSIONAL SUMMARY</h2>
          <p className="text-sm leading-relaxed">{resumeData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-primary border-b border-primary pb-2 mb-3">EXPERIENCE</h2>
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold text-dark">{exp.position}</h3>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
              {exp.responsibilities && (
                <ul className="text-sm ml-4 space-y-1">
                  {exp.responsibilities.map((resp, ridx) => (
                    <li key={ridx} className="list-disc">• {resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-primary border-b border-primary pb-2 mb-3">EDUCATION</h2>
          {resumeData.education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold text-dark">{edu.degree} in {edu.field}</h3>
                <span className="text-sm text-gray-600">{edu.graduationYear}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-primary border-b border-primary pb-2 mb-3">SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, idx) => (
              <span key={idx} className="text-sm bg-light px-3 py-1 rounded-full">
                {typeof skill === 'string' ? skill : skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-primary border-b border-primary pb-2 mb-3">CERTIFICATIONS</h2>
          <ul className="text-sm space-y-2">
            {resumeData.certifications.map((cert, idx) => (
              <li key={idx} className="flex items-center">
                • {typeof cert === 'string' ? cert : cert.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderModernTemplate = () => (
    <div className="bg-white font-sans text-gray-800">
      {/* Header with color */}
      <div className="bg-primary text-white p-8 mb-6">
        <h1 className="text-4xl font-bold">{resumeData.personalInfo?.name || 'Your Name'}</h1>
        <div className="text-sm mt-3 opacity-90">
          {resumeData.personalInfo?.email && <span>{resumeData.personalInfo.email} • </span>}
          {resumeData.personalInfo?.phone && <span>{resumeData.personalInfo.phone} • </span>}
          {resumeData.personalInfo?.location && <span>{resumeData.personalInfo.location}</span>}
        </div>
      </div>

      <div className="px-8">
        {/* Summary */}
        {resumeData.personalInfo?.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-primary mb-3">PROFESSIONAL SUMMARY</h2>
            <p className="text-sm leading-relaxed text-gray-700">{resumeData.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-primary mb-3">EXPERIENCE</h2>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-bold text-secondary">{exp.position}</h3>
                <p className="text-sm text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate || 'Present'}</p>
                {exp.responsibilities && (
                  <ul className="text-sm ml-4 mt-2 space-y-1">
                    {exp.responsibilities.map((resp, ridx) => (
                      <li key={ridx}>• {resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-primary mb-3">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, idx) => (
                <span key={idx} className="text-xs bg-light px-3 py-1 rounded">
                  {typeof skill === 'string' ? skill : skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Preview Actions */}
      <div className="bg-white border-b p-4 flex gap-3 justify-end">
        <button
          onClick={handleDownloadPDF}
          disabled={loading}
          className="flex items-center gap-2 bg-success text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          <FiDownload /> {loading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      {/* Preview Container */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white shadow-lg max-w-4xl mx-auto">
          {template === 'modern' && renderModernTemplate()}
          {template === 'minimal' && renderProfessionalTemplate()}
          {template === 'professional' && renderProfessionalTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
