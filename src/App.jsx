import './App.css'
import Player from './components/Player/Player';
import {useEffect, useRef, useState} from 'react';
import songsData from './components/Player/audios.js';

function App() {
  const [songs, setSongs] = useState(songsData);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsData[1]);
  const audioElem = useRef();

  function mute() {
    setMuted(true);
  }

  function unMute() {
    setMuted(false);
  }

  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
    audioElem.current.volume = volume;
    audioElem.current.muted = muted;
  }, [isPlaying, currentSong, volume, muted]);

  function onPlaying() {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({...currentSong, 'progress': ct / duration * 100, 'length': duration});
  }

  return (
    <div className="App">
      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying}/>
      <div className="songs-list">
        {songsData.map((el) => (
          <h2>{el.title} {el.duration}</h2>
        ))}
      </div>
      <Player
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioElem={audioElem}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        muted={muted}
        mute={mute}
        unMute={unMute}
        setVolume={setVolume}
        volume={volume}
      />
    </div>
  );

}

export default App
