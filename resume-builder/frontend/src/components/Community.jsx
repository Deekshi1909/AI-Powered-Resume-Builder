import React, { useState, useEffect } from 'react';
import { FiUsers, FiThumbsUp, FiEye } from 'react-icons/fi';
import { communityAPI } from '../api';

const Community = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      setLoading(true);
      const response = await communityAPI.getAll();
      setResumes(response.data || []);
    } catch (error) {
      console.error('Error loading resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-8 mb-8 text-center">
          <div className="flex justify-center mb-4">
            <FiUsers className="text-4xl text-secondary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Resume Community</h1>
          <p className="text-gray-600">
            Learn from successful resumes that led to job offers and shortlists
          </p>
        </div>

        {/* Resume Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading community resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No resumes shared yet. Be the first!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                onClick={() => setSelectedResume(resume)}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <div>
                  <h3 className="text-lg font-bold text-primary line-clamp-2">{resume.jobTitle}</h3>
                  <p className="text-sm text-gray-600 mt-1">{resume.company}</p>
                  <p className="text-sm text-secondary font-semibold mt-2">Shared by {resume.userName}</p>

                  {resume.feedback && (
                    <p className="text-xs text-gray-500 mt-3 line-clamp-2 italic">
                      "{resume.feedback}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <FiEye /> {resume.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiThumbsUp /> {resume.upvotes || 0}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(resume.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for viewing resume */}
      {selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-primary">{selectedResume.jobTitle}</h2>
                <p className="text-gray-600">{selectedResume.company}</p>
                <p className="text-secondary font-semibold mt-1">By {selectedResume.userName}</p>
              </div>
              <button
                onClick={() => setSelectedResume(null)}
                className="text-gray-500 text-2xl p-2 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              {selectedResume.feedback && (
                <div className="mb-4">
                  <h3 className="font-semibold text-primary mb-2">Success Story</h3>
                  <p className="text-gray-700">{selectedResume.feedback}</p>
                </div>
              )}

              <h3 className="font-semibold text-primary mb-2">Resume Preview</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm max-h-64 overflow-y-auto">
                <p className="font-bold">{selectedResume.resumeData?.personalInfo?.name}</p>
                <p className="text-xs text-gray-600 mb-3">
                  {selectedResume.resumeData?.personalInfo?.email}
                </p>

                {selectedResume.resumeData?.experience?.[0] && (
                  <div>
                    <p className="font-semibold text-dark mt-2">Latest Position</p>
                    <p className="text-xs">
                      {selectedResume.resumeData.experience[0].position} at{' '}
                      {selectedResume.resumeData.experience[0].company}
                    </p>
                  </div>
                )}

                {selectedResume.resumeData?.skills?.length > 0 && (
                  <div>
                    <p className="font-semibold text-dark mt-2">Skills</p>
                    <p className="text-xs">
                      {selectedResume.resumeData.skills
                        .slice(0, 5)
                        .map(s => (typeof s === 'string' ? s : s.name))
                        .join(', ')}
                      {selectedResume.resumeData.skills.length > 5 ? '...' : ''}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
