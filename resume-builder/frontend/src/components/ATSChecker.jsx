import React, { useState, useContext } from 'react';
import { FiBarChart2, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { ResumeContext } from '../context/ResumeContext';
import { resumeAPI } from '../api';

const ATSChecker = () => {
  const { resumeData } = useContext(ResumeContext);
  const [jobDescription, setJobDescription] = useState('');
  const [atsScore, setAtsScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculateATS = async () => {
    if (!jobDescription.trim()) {
      alert('Please paste a job description');
      return;
    }

    try {
      setLoading(true);
      const response = await resumeAPI.calculateATS({
        resumeData,
        jobDescription
      });

      setAtsScore(response.data);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-accent';
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-accent';
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <FiBarChart2 className="text-secondary text-2xl" />
        <h2 className="text-2xl font-bold text-primary">ATS Score Checker</h2>
      </div>

      <div className="space-y-4">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary resize-none"
        />

        <button
          onClick={handleCalculateATS}
          disabled={loading}
          className="w-full bg-secondary text-white px-4 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 font-semibold"
        >
          {loading ? 'Calculating...' : 'Calculate ATS Score'}
        </button>
      </div>

      {/* Score Results */}
      {atsScore && (
        <div className="mt-8 space-y-6">
          {/* Overall Score */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-end justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Overall ATS Score</h3>
              <div className={`text-4xl font-bold ${getScoreColor(atsScore.totalScore)}`}>
                {atsScore.totalScore}%
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${getProgressColor(atsScore.totalScore)} transition-all duration-500`}
                style={{ width: `${atsScore.totalScore}%` }}
              />
            </div>
          </div>

          {/* Score Breakdown */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Score Breakdown</h3>
            <div className="space-y-3">
              {Object.entries(atsScore.breakdown).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-300 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(value)} transition-all`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className={`font-bold ${getScoreColor(value)}`}>{value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          {atsScore.suggestions && atsScore.suggestions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Improvement Suggestions</h3>
              <div className="space-y-3">
                {atsScore.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-yellow-50 border-l-4 border-warning rounded">
                    <div className="flex-shrink-0">
                      {suggestion.priority === 'high' ? (
                        <FiAlertCircle className="text-accent text-xl" />
                      ) : (
                        <FiCheckCircle className="text-warning text-xl" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-dark">{suggestion.category}</p>
                      <p className="text-sm text-gray-700">{suggestion.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
