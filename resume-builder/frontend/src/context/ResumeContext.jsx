import React, { createContext, useState } from 'react';

export const ResumeContext = createContext();

const initialResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  certifications: []
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || 'user_' + Date.now());

  const updateResumeData = (data) => {
    setResumeData(data);
  };

  const resetResume = () => {
    setResumeData(initialResumeData);
  };

  const loadResume = (data) => {
    setResumeData(data);
  };

  React.useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        resetResume,
        loadResume,
        userId,
        setUserId
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
