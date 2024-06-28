import React, {useEffect, useState} from 'react';
import '../../styles/player.scss';
import Volume from './VolumeBar.jsx';
import PlayerControl from './Control.jsx';
import ProgressSlider from './ProgressSlider.jsx';

export default function Player(
  {audioElem, songs, currentSong, setCurrentSong, audioProgress, setAudioProgress, isPlaying, setIsPlaying}
) {
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  function mute() {
    setMuted(true);
  }

  function unMute() {
    setMuted(false);
  }

  useEffect(() => {
    audioElem.current.volume = volume;
    audioElem.current.muted = muted;
  }, [volume, muted]);


  function play() {
    setIsPlaying(true);
  }

  function pause() {
    setIsPlaying(false);
  }

  function playPrevious() {
    const index = songs.findIndex(x => x.title === currentSong.title);
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
  }

  function playNext() {
    const index = songs.findIndex(x => x.title === currentSong.title);
    if (index === songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
  }

  function progressChange(e) {
    const progress = e.currentTarget.value;
    audioElem.current.currentTime = (progress / 100) * audioElem.current.duration;
    setAudioProgress(e.currentTarget.value);
  }

  function volumeChange(e) {
    const newVolume = e.target.value;
    setVolume(newVolume);
  }

  return (
    <div className="playback-bar">
      <ProgressSlider
        audioProgress={audioProgress}
        onProgressChange={progressChange}
      />

      <div className="left-playback">
        <img src={currentSong.imageUrl} alt=""/>
        <div className="playback-info">
          <h5 className="playback-head">{currentSong.title}</h5>
          <p className="playback-artist">{currentSong.artist}</p>
        </div>
      </div>
      <PlayerControl
        playPrevious={playPrevious}
        play={play}
        playNext={playNext}
        pause={pause}
        isPlaying={isPlaying}
      />
      <Volume
        volume={volume}
        onVolumeChange={volumeChange}
        muted={muted}
        mute={mute}
        unMute={unMute}
      />
    </div>
  )
}
