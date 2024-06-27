import React, {useEffect, useRef, useState} from 'react';
import './App.css'
import songsData from './components/Player/audios.js';

import './index.scss';
import SideBar from './components/Player/SideBar.jsx';
import Player from './components/Player/Player.jsx';

function App() {
  const [songs, setSongs] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [canPlayThrough, setCanPlayThrough] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElem = useRef();

  useEffect(() => {
    function handleKeyDown(event) {
      switch (event.code) {
        case 'Space':
          event.preventDefault();
          setIsPlaying(prev => !prev);
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  useEffect(() => {
    if (canPlayThrough) {
      if (isPlaying) {
        audioElem.current.play();
      } else {
        audioElem.current.pause();
      }
    }
  }, [canPlayThrough, isPlaying]);

  useEffect(() => {
    if (canPlayThrough) {
      audioElem.current.play();
      audioElem.current.currentTime = 0;
    }
  }, [currentSong]);

  function onPlaying() {
    if (audioElem.current && audioElem.current.duration > 0) {
      const duration = audioElem.current.duration;
      const ct = audioElem.current.currentTime;
      setAudioProgress((ct / duration) * 100);
    }
  }

  function fetchSongs() {
    // ToDo: implement and remove songs from state
  }

  function chooseCurrentSong(song) {
    setCurrentSong(song);
    setIsPlaying(true);
  }

  function onEnded() {
    setIsPlaying(false);
    audioElem.current.currentTime = 0;
    setAudioProgress(0);
  }

  return (
    <>
      <nav>
        <img src="media/on_platform_logo_dark.svg" alt=""/>
        <img className="acc-logo" src="media/acc_logo.jpg" alt=""/>
      </nav>
      <div className="main">
        <SideBar img={'media/sidebar_image.png'}/>

        <div className="main-queue">
          <div className="main-queue-head">
            <div className="queue-head-1 active">
              <h4>PLAYLIST</h4>
            </div>
            <div className="queue-head-2">
              <h4>UPLOAD</h4>
            </div>
          </div>
          <div className="lyrics-text d-none">
            <p>Lyrics Section Coming Soon....</p>
            <p>Keep supporting and we will add much more features in this app.</p>
            <p className="last-para">Please if u like this project give it a star on github.</p>
            <button><a href="https://github.com/alpha2207/yt-music-clone">Star this project on github.</a></button>
          </div>
          <div className="main-queue-playlist d-flex">
            <ul>
              {songsData.map((song) => (
                <li key={song.title} onClick={() => chooseCurrentSong(song)}>
                  <img src={song.image} alt=""/>
                  <div className="playlist-text">
                    <h5>{song.title}</h5>
                    <p>{song.title}</p>
                  </div>
                  <p className="time">{song.duration}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
        <audio
          src={currentSong ? currentSong.url : ''}
          ref={audioElem}
          onTimeUpdate={onPlaying}
          onCanPlayThrough={() => setCanPlayThrough(true)}
          onEnded={onEnded}
        />
        {currentSong &&
          <>
            <Player
              audioElem={audioElem}
              songs={songs}
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              onPlaying={onPlaying}
              audioProgress={audioProgress}
              setAudioProgress={setAudioProgress}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </>
        }
      </div>
    </>
  );

}

export default App
