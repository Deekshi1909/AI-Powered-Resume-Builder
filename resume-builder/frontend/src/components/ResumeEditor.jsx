import React, { useState, useContext } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { ResumeContext } from '../context/ResumeContext';

const ResumeEditor = () => {
  const { resumeData, updateResumeData } = useContext(ResumeContext);
  const [activeSection, setActiveSection] = useState('personal');

  const handlePersonalInfoChange = (field, value) => {
    updateResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };

  const handleAddExperience = () => {
    const newExp = {
      id: Date.now(),
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      responsibilities: []
    };
    updateResumeData({
      ...resumeData,
      experience: [...(resumeData.experience || []), newExp]
    });
  };

  const handleUpdateExperience = (index, field, value) => {
    const updatedExp = [...resumeData.experience];
    updatedExp[index] = { ...updatedExp[index], [field]: value };
    updateResumeData({ ...resumeData, experience: updatedExp });
  };

  const handleRemoveExperience = (index) => {
    const updatedExp = resumeData.experience.filter((_, i) => i !== index);
    updateResumeData({ ...resumeData, experience: updatedExp });
  };

  const handleAddEducation = () => {
    const newEdu = {
      id: Date.now(),
      school: '',
      degree: '',
      field: '',
      graduationYear: new Date().getFullYear()
    };
    updateResumeData({
      ...resumeData,
      education: [...(resumeData.education || []), newEdu]
    });
  };

  const handleUpdateEducation = (index, field, value) => {
    const updatedEdu = [...resumeData.education];
    updatedEdu[index] = { ...updatedEdu[index], [field]: value };
    updateResumeData({ ...resumeData, education: updatedEdu });
  };

  const handleRemoveEducation = (index) => {
    const updatedEdu = resumeData.education.filter((_, i) => i !== index);
    updateResumeData({ ...resumeData, education: updatedEdu });
  };

  const handleAddSkill = () => {
    updateResumeData({
      ...resumeData,
      skills: [...(resumeData.skills || []), { name: '', proficiency: 'Intermediate' }]
    });
  };

  const handleUpdateSkill = (index, field, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    updateResumeData({ ...resumeData, skills: updatedSkills });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = resumeData.skills.filter((_, i) => i !== index);
    updateResumeData({ ...resumeData, skills: updatedSkills });
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-y-auto">
      {/* Section Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex overflow-x-auto">
          {['personal', 'experience', 'education', 'skills', 'certifications'].map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
                activeSection === section
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 max-w-2xl">
        {/* Personal Info Section */}
        {activeSection === 'personal' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-6">Personal Information</h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={resumeData.personalInfo?.name || ''}
                onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={resumeData.personalInfo?.email || ''}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={resumeData.personalInfo?.phone || ''}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={resumeData.personalInfo?.location || ''}
                onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                placeholder="San Francisco, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Summary</label>
              <textarea
                value={resumeData.personalInfo?.summary || ''}
                onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary h-24"
                placeholder="Brief professional summary..."
              />
            </div>
          </div>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Experience</h2>
              <button
                onClick={handleAddExperience}
                className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <FiPlus /> Add Experience
              </button>
            </div>

            {resumeData.experience?.map((exp, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg mb-4 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Position {idx + 1}</h3>
                  <button
                    onClick={() => handleRemoveExperience(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      value={exp.position || ''}
                      onChange={(e) => handleUpdateExperience(idx, 'position', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="Job Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={exp.company || ''}
                      onChange={(e) => handleUpdateExperience(idx, 'company', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate || ''}
                      onChange={(e) => handleUpdateExperience(idx, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="Jan 2020"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate || ''}
                      onChange={(e) => handleUpdateExperience(idx, 'endDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="Present"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={exp.description || ''}
                    onChange={(e) => handleUpdateExperience(idx, 'description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary h-20"
                    placeholder="Job description..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {activeSection === 'education' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Education</h2>
              <button
                onClick={handleAddEducation}
                className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <FiPlus /> Add Education
              </button>
            </div>

            {resumeData.education?.map((edu, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg mb-4 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Education {idx + 1}</h3>
                  <button
                    onClick={() => handleRemoveEducation(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">School</label>
                    <input
                      type="text"
                      value={edu.school || ''}
                      onChange={(e) => handleUpdateEducation(idx, 'school', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Degree</label>
                    <input
                      type="text"
                      value={edu.degree || ''}
                      onChange={(e) => handleUpdateEducation(idx, 'degree', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="Bachelor's, Master's, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Field of Study</label>
                    <input
                      type="text"
                      value={edu.field || ''}
                      onChange={(e) => handleUpdateEducation(idx, 'field', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Graduation Year</label>
                    <input
                      type="number"
                      value={edu.graduationYear || ''}
                      onChange={(e) => handleUpdateEducation(idx, 'graduationYear', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="2023"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Skills</h2>
              <button
                onClick={handleAddSkill}
                className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <FiPlus /> Add Skill
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {resumeData.skills?.map((skill, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 flex items-end justify-between">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Skill</label>
                    <input
                      type="text"
                      value={skill.name || ''}
                      onChange={(e) => handleUpdateSkill(idx, 'name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="e.g., React, Python"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveSkill(idx)}
                    className="ml-2 text-red-500 hover:text-red-700 p-2"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeEditor;
