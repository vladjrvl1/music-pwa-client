import React, {useEffect, useRef, useState} from 'react';
import {Link, Navigate, Route, Routes, useLocation} from 'react-router-dom';

import SideBar from './components/Player/SideBar.jsx';
import Player from './components/Player/Player.jsx';
import Playlist from './components/Player/PlayList.jsx';
import UploadSong from './components/Player/UploadSong.jsx';
import {fetchSongs} from './api/songs.js';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [canPlayThrough, setCanPlayThrough] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElem = useRef();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/playlist') {
      getSongs(setSongs);
    }
  }, [location.pathname]);

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
  }, [canPlayThrough, currentSong]);

  useEffect(() => {
    function handleKeyDown(event) {
      switch (event.code) {
        case 'Space':
          if (event.target.tagName !== 'INPUT') {
            event.preventDefault();
            setIsPlaying(prev => !prev);
            break;
          }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function onPlaying() {
    if (audioElem.current && audioElem.current.duration > 0) {
      const duration = audioElem.current.duration;
      const ct = audioElem.current.currentTime;
      setAudioProgress((ct / duration) * 100);
    }
  }

  async function getSongs() {
    try {
      const result = await fetchSongs();
      setSongs(Array.isArray(result.data.songs) ? result.data.songs : []);
    } catch (error) {
      console.log('Failed to fetch songs.')
    }
  }

  function chooseCurrentSong(song) {
    if (song === currentSong) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
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
        <SideBar img={currentSong ? currentSong.imageUrl : 'media/sidebar_image.png'}/>

        <div className="main-queue">
          <div className="main-queue-head">
            <div>
              <Link to="/playlist" className={`queue-head-1${location.pathname === '/playlist' ? ' active' : ''}`}>
                PLAYLIST
              </Link>
            </div>
            <div>
              <Link to="/upload" className={`queue-head-2${location.pathname === '/upload' ? ' active' : ''}`}>
                UPLOAD
              </Link>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="/playlist"/>}/>
            <Route path="/playlist"
                   element={<Playlist songs={songs} currentSong={currentSong} chooseCurrentSong={chooseCurrentSong}/>}
            />
            <Route path="/upload" element={<UploadSong/>}/>
          </Routes>
        </div>
        <audio
          src={currentSong ? currentSong.audioUrl : ''}
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
