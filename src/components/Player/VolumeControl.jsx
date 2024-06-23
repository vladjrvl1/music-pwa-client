import React, {useEffect, useRef, useState} from 'react';

export default function VolumeControl({volume, setVolume}) {
  const [isDragging, setIsDragging] = useState(false);
  const clickVolumeRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const rect = clickVolumeRef.current.getBoundingClientRect();
    const width = ((e.clientX - rect.left) / rect.width);

    const newVolumeWidth = Math.min(1, Math.max(0, width));
    setVolume(newVolumeWidth);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  // ToDo: replace styles for a volume control
  return (
    <div className="navigation">
      <div className="navigation_wrapper" onMouseDown={handleMouseDown} ref={clickVolumeRef}>
        <div className="seek_bar" style={{width: `${volume * 100}%`}}></div>
      </div>
    </div>
  );
};
