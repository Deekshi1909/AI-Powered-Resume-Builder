import React, { useState, useContext } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { ResumeContext } from '../context/ResumeContext';
import ResumeEditor from './ResumeEditor';
import ResumePreview from './ResumePreview';
import AIAssistant from './AIAssistant';
import ATSChecker from './ATSChecker';

const DashboardLayout = () => {
  const { resumeData } = useContext(ResumeContext);
  const [activeView, setActiveView] = useState('editor');
  const [template, setTemplate] = useState('professional');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const views = [
    { id: 'editor', label: 'Editor', icon: '✏️' },
    { id: 'preview', label: 'Preview', icon: '👁️' },
    { id: 'ai', label: 'AI Assistant', icon: '✨' },
    { id: 'ats', label: 'ATS Check', icon: '📊' }
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Resume Builder Pro</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-primary border-t border-gray-700 space-y-2">
            {views.map(view => (
              <button
                key={view.id}
                onClick={() => {
                  setActiveView(view.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                  activeView === view.id
                    ? 'bg-secondary text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                {view.icon} {view.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-32 bg-primary text-white flex-col p-4 space-y-2">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`px-4 py-3 rounded-lg font-semibold transition text-left ${
                activeView === view.id
                  ? 'bg-secondary text-white'
                  : 'hover:bg-gray-700'
              }`}
              title={view.label}
            >
              <div className="text-2xl mb-1">{view.icon}</div>
              <div className="text-xs">{view.label}</div>
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden flex">
          {/* Left Panel */}
          <div className="hidden lg:flex lg:w-1/3 border-r border-gray-300 overflow-y-auto">
            <div className="w-full">
              <ResumeEditor />
            </div>
          </div>

          {/* Center/Right Panel */}
          <div className="flex-1 overflow-y-auto">
            {activeView === 'editor' && (
              <div className="lg:hidden h-full p-6">
                <ResumeEditor />
              </div>
            )}

            {activeView === 'preview' && (
              <div className="h-full flex flex-col">
                <div className="bg-white border-b p-4">
                  <label className="text-sm font-semibold text-gray-700 mr-4">
                    Select Template:
                  </label>
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="professional">Professional</option>
                    <option value="modern">Modern</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>
                <ResumePreview resumeData={resumeData} template={template} />
              </div>
            )}

            {activeView === 'ai' && (
              <div className="p-6 h-full">
                <AIAssistant />
              </div>
            )}

            {activeView === 'ats' && (
              <div className="p-6 h-full">
                <ATSChecker />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
