import React from 'react';

export default function Volume({volume, onVolumeChange, muted, mute, unMute}) {

  return (
    <div className="volume">
      <input
        type="range"
        className="volume-slider"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        onInput={onVolumeChange}
      />
      {muted
        ? <i className="vol-down fas fa-volume-mute" aria-hidden="true" onClick={unMute}></i>
        : <i className="vol-up fas fa-volume-up" aria-hidden="true" onClick={mute}></i>
      }
    </div>
  );
}
