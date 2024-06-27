export default function ProgressSlider({audioProgress, onProgressChange}) {
  return (
    <input
      className="progress-slider"
      type="range"
      min="0"
      value={audioProgress} max="100"
      onChange={onProgressChange}
    />
  );
}