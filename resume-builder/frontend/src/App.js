import React from 'react';
import './App.css';
import { ResumeProvider } from './context/ResumeContext';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <ResumeProvider>
      <DashboardLayout />
    </ResumeProvider>
  );
}

export default App;
