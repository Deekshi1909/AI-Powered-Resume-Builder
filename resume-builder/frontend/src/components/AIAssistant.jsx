import React, { useState, useContext } from 'react';
import { FiZap, FiLoader } from 'react-icons/fi';
import { ResumeContext } from '../context/ResumeContext';
import { aiAPI } from '../api';

const AIAssistant = () => {
  const { resumeData, updateResumeData } = useContext(ResumeContext);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleGenerateCustomized = async () => {
    if (!jobDescription.trim()) {
      alert('Please paste a job description');
      return;
    }

    try {
      setLoading(true);
      const response = await aiAPI.generateCustomized({
        resumeData,
        jobDescription
      });

      setResults({
        type: 'customized',
        data: response.data
      });
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExtractKeywords = async () => {
    if (!jobDescription.trim()) {
      alert('Please paste a job description');
      return;
    }

    try {
      setLoading(true);
      const response = await aiAPI.extractKeywords({
        jobDescription
      });

      setResults({
        type: 'keywords',
        data: response.data
      });
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetSuggestions = async () => {
    if (!jobDescription.trim()) {
      alert('Please paste a job description');
      return;
    }

    try {
      setLoading(true);
      const response = await aiAPI.getSuggestions({
        resumeData,
        jobDescription
      });

      setResults({
        type: 'suggestions',
        data: response.data
      });
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <FiZap className="text-secondary text-2xl" />
          <h2 className="text-2xl font-bold text-primary">AI Assistant</h2>
        </div>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary resize-none"
        />

        <div className="grid grid-cols-3 gap-2 mt-4">
          <button
            onClick={handleGenerateCustomized}
            disabled={loading}
            className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <FiLoader className="animate-spin" /> : '✨'} Customize Resume
          </button>
          <button
            onClick={handleExtractKeywords}
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <FiLoader className="animate-spin" /> : '🎯'} Extract Keywords
          </button>
          <button
            onClick={handleGetSuggestions}
            disabled={loading}
            className="bg-success text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <FiLoader className="animate-spin" /> : '💡'} Get Suggestions
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="flex-1 overflow-y-auto p-6">
          {results.type === 'keywords' && (
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">Extracted Keywords & Skills</h3>
              <div className="space-y-4">
                {results.data.requiredSkills && (
                  <div>
                    <h4 className="font-semibold text-dark mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.data.requiredSkills.map((skill, idx) => (
                        <span key={idx} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {results.data.preferredSkills && (
                  <div>
                    <h4 className="font-semibold text-dark mb-2">Preferred Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.data.preferredSkills.map((skill, idx) => (
                        <span key={idx} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {results.type === 'suggestions' && (
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">Improvement Suggestions</h3>
              <div className="space-y-4">
                {results.data.strengths && (
                  <div>
                    <h4 className="font-semibold text-success mb-2">✓ Your Strengths</h4>
                    <ul className="space-y-1">
                      {results.data.strengths.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {results.data.improvements && (
                  <div>
                    <h4 className="font-semibold text-accent mb-2">⚠️ Areas to Improve</h4>
                    <ul className="space-y-1">
                      {results.data.improvements.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
