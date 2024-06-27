export default function Control({playPrevious, play, playNext, pause, isPlaying}) {
  return (
    <div className="controls">
      <i className="back fas fa-step-backward" aria-hidden="true" onClick={playPrevious}></i>
      {isPlaying
        ? <i className="pause fas fa-pause" aria-hidden="true" onClick={pause}></i>
        : <i className="play fas fa-play" aria-hidden="true" onClick={play}></i>
      }
      <i className="next fas fa-step-forward" aria-hidden="true" onClick={playNext}></i>
    </div>
  );
}
