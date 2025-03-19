"use client";
import React, { useState } from 'react';

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoType, setVideoType] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setVideoFile(file);
    }
  };

  const handleVideoTypeChange = (e) => {
    setVideoType(e.target.value);
  };

  const handleUpload = async () => {
    if (!videoFile || !videoType) return alert("Please select a video first.");

    setIsUploading(true);
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('video_type', videoType);

    try {
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setUploadStatus(`Upload Complete! Highlights: ${JSON.stringify(data.highlights)}`);
    } catch (error) {
      setUploadStatus('Upload Failed');
      console.error('Error uploading video:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
        <label htmlFor="videoType">Video Type:</label>
        <select
            id="videoType"
            value={videoType}
            onChange={handleVideoTypeChange}
        >
            <option value="">Select Video Type</option>
            <option value="General Purpose">General Purpose</option>
            <option value="Sports/Action">Sports/Action</option>
            <option value="Interviews/Conferences">Interviews/Conferences</option>
            <option value="Movies/Shows">Movies/Shows</option>
            <option value="Social Media">Social Media</option>
        </select>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Video'}
      </button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default UploadVideo;
