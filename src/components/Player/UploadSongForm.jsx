import React, { useState } from 'react';

function UploadSongForm() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('operations', JSON.stringify({
      query: `
        mutation UploadSong($audio: Upload!, $image: Upload!, $title: String!, $artist: String!) {
          uploadSong(audio: $audio, title: $title, artist: $artist, image: $image) {
            success
            song {
              id
              title
              artist
              audio
              image
            }
          }
        }
      `,
      variables: {
        audio: null,
        image: null,
        title: title,
        artist: artist,
      }
    }));

    formData.append('map', JSON.stringify({
      "0": ["variables.audio"],
      "1": ["variables.image"]
    }));

    formData.append('0', audioFile);
    formData.append('1', imageFile);

    const response = await fetch('http://localhost:8000/songs/graphql/', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Artist:</label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      </div>
      <div>
        <label>Audio File:</label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioChange}
        />
      </div>
      <div>
        <label>Image File:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadSongForm;
