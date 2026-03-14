import React, { useState } from 'react';
import { FiFileUp, FiX } from 'react-icons/fi';
import fileProcessor from '../services/fileProcessor';

const FileUpload = ({ onFileProcessed }) => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setFileName(file.name);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/api/file/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        onFileProcessed(data.parsedResume);
      } else {
        alert('Error processing file: ' + data.error);
      }
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-dashed border-secondary rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition">
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png,.txt,.doc,.docx"
        className="hidden"
        id="fileInput"
        disabled={loading}
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <FiFileUp className="mx-auto text-4xl text-secondary mb-4" />
        <p className="text-lg font-semibold text-primary mb-2">
          {loading ? 'Processing...' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-sm text-gray-600">PDF, Images, or Documents (Max 10MB)</p>
        {fileName && <p className="text-sm text-success mt-2">✓ {fileName}</p>}
      </label>
    </div>
  );
};

export default FileUpload;
