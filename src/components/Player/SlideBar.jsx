import React, {useRef} from 'react';

export default function SlideBar({audioElem, currentSong}) {
  const clickDurationRef = useRef();

  function checkDurationWidth(e) {
    let width = clickDurationRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = offset / width * 100;
    audioElem.current.currentTime = divprogress / 100 * currentSong.length;
  }

  return (
    <div className="navigation">
      <div className="navigation_wrapper" onClick={checkDurationWidth} ref={clickDurationRef}>
        <div className="seek_bar" style={{width: `${currentSong.progress + '%'}`}}></div>
      </div>
    </div>
  )
}