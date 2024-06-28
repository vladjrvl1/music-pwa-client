import React, {useState} from 'react';
import {uploadSong} from '../../api/songs.js';

function UploadSong() {
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');

  function handleSuccessUpload(form) {
    setStatusMessage(`Audiofile successfully uploaded!`);
    setIsSuccess(true);
    form.reset();
  }

  function handleFailedUpload(msg) {
    if (!msg) {
      msg = 'Upload failed'
    }
    setIsSuccess(false);
    setStatusMessage(msg);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const result = await uploadSong(formData);
      if (result.data.uploadSong.success) {
        handleSuccessUpload(e.target);
      } else {
        handleFailedUpload();
      }
    } catch (error) {
      handleFailedUpload('An error occurred.');
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
          />
        </div>
        <div>
          <label>Artist:</label>
          <input
            type="text"
            name="artist"
          />
        </div>
        <div>
          <label>Audio File:</label>
          <input
            type="file"
            name="audio"
            accept="audio/*"
          />
        </div>
        <div>
          <label>Image File:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {statusMessage && (
        <p className={`status-message ${isSuccess ? 'success' : 'error'}`}>
          {statusMessage}
        </p>
      )}
    </div>
  );
}

export default UploadSong;
