import React from 'react';

function Playlist({songs, currentSong, chooseCurrentSong}) {
  return (
    <div className="main-queue-playlist d-flex">
      <ul>
        {songs.map((song) => (
          <li
            key={song.title}
            onClick={() => chooseCurrentSong(song)}
            className={song === currentSong ? 'active-song' : ''}
          >
            <img src={song.imageUrl} alt=""/>
            <div className="playlist-text">
              <h5>{song.artist}</h5>
              <p>{song.title}</p>
            </div>
            <p className="time">{song.duration ? song.duration : '-'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;
