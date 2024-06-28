import {SONGS_GRAPHQL_URL} from './constants.js';

async function fetchSongs() {
  const response = await fetch(SONGS_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
            query {
              songs {
                id
                title
                artist
                audioUrl
                imageUrl
                duration
              }
            }
          `,
    }),
  });

  if (!response.ok) {
    throw new Error('Server error');
  }

  return response.json();
}

async function uploadSong(formData) {
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
      title: formData.get('title'),
      artist: formData.get('artist'),
    }
  }));

  formData.append('map', JSON.stringify({
    "0": ["variables.audio"],
    "1": ["variables.image"]
  }));

  formData.append('0', formData.get('audio'));
  formData.append('1', formData.get('image'));

  const response = await fetch(SONGS_GRAPHQL_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Server error');
  }

  return response.json();
}

export {
  fetchSongs,
  uploadSong,
}