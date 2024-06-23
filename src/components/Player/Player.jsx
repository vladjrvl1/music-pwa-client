import React from 'react';
import '../../styles/player.scss';
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsFillSkipEndCircleFill,
  BsFillSkipStartCircleFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
} from 'react-icons/bs';
import VolumeControl from './VolumeControl.jsx';
import SlideBar from './SlideBar.jsx';

export default function Player({
                                 audioElem,
                                 isPlaying,
                                 setIsPlaying,
                                 currentSong,
                                 setCurrentSong,
                                 songs,
                                 muted,
                                 mute,
                                 unMute,
                                 setVolume,
                                 volume,
                               }) {

  function play() {
    setIsPlaying(true);
  }

  function pause() {
    setIsPlaying(false);
  }

  function playPrevious() {
    const index = songs.findIndex(x => x.title === currentSong.title);
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1])
    } else {
      setCurrentSong(songs[index - 1])
    }
    audioElem.current.currentTime = 0;
  }

  function playNext() {
    const index = songs.findIndex(x => x.title === currentSong.title);
    if (index === songs.length - 1) {
      setCurrentSong(songs[0])
    } else {
      setCurrentSong(songs[index + 1])
    }
    audioElem.current.currentTime = 0;
  }

  return (
    <div className="player_container">
      <div className="title">
        <p>{currentSong.title}</p>
      </div>
      <SlideBar audioElem={audioElem} currentSong={currentSong}/>
      <div className="controls">
        {muted
          ? <BsFillVolumeMuteFill className="btn_action" onClick={unMute}/>
          : <BsFillVolumeUpFill className="btn_action" onClick={mute}/>
        }
        <VolumeControl
          volume={volume}
          setVolume={setVolume}
        />
        <div className="volume-bar"></div>
        <BsFillSkipStartCircleFill className="btn_action" onClick={playPrevious}/>
        {isPlaying
          ? <BsFillPauseCircleFill className="btn_action pp" onClick={pause}/>
          : <BsFillPlayCircleFill className="btn_action pp" onClick={play}/>
        }
        <BsFillSkipEndCircleFill className="btn_action" onClick={playNext}/>
      </div>
    </div>
  )
}
