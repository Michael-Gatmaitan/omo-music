import { useContext, useRef, useEffect } from 'react';
import './scss/FloatingMusicTrackComps.css';
import { AudioContext } from '../context/AudioContext';

const FloatingMusicTrackComps = () => {

  const audioContext = useContext(AudioContext);
  const {
    activeMusicInfo,
    currentTime,
    duration,
    currentDurPercent,

    trackList,

    trackHistory,
    trackHistoryIndex,
    prev,
    activeMusic,
    playing,
    next,

  } = audioContext;

  const { title, artistName, path } = activeMusicInfo;
  let seekBar = useRef(null);
  
  let audioEl = document.getElementsByTagName("audio")[0];
  let curTDisp = {
    curMin: Math.floor(currentTime / 60).toString(),
    curSec: Math.round(currentTime % 60).toString(),
  }
  let { curMin, curSec } = curTDisp;

  let durTDisp = {
    durMin: Math.floor(duration / 60).toString(),
    durSec: Math.round(duration % 60).toString(),
  }
  let { durMin, durSec } = durTDisp;

  useEffect(() => {
    console.log(path);
  }, [path])

  return (
    <div className="floating-music-track">
      
      <div className="artist-image-bg">
        <img src={`../artists-image/${path}.jpg`} alt="" />
      </div>
      <div className="blur-bg" />

      <div className="floating-childs-parent">

        <div className="floating-artist-image-container">
          <img src={`../artists-image/${path}.jpg`} alt="" />
        </div>

        <div className="floating-music-info">
          <div className="music-title">{title || "OMO Music"}</div>
          <div className="artist-name">{artistName || "M. Gatmaitan, 2021"}</div>
        </div>

        <div className="floating-seekbar">

          <div className="current-time seekbar-times">
            {`${
              curMin.length === 2 ? curMin : `0${curMin}`
            }`}
            :
            {`${
              curSec.length === 2 ? curSec : `0${curSec}`
            }`}
          </div>
          
          <div className="seekbar-container">
            <div
              className="slider-progress"
              style={{
                width: `${currentDurPercent}%`
              }}
            />
            
            <input
              ref={e => seekBar = e }

              type="range"
              min="0"
              max={duration}
              step="0.25"
              value={currentTime}
              className="slider"
              onChange={_ => audioEl.currentTime = parseInt(seekBar.value)}
            />

          </div>
          
          <div className="total-time seekbar-times">
            {`${durMin.length === 2 ? durMin : `0${durMin}`}`}
            :
            {`${durSec.length === 2 ? durSec : `0${durSec}`}`}
          </div>
        </div>

        <div className="music-track-events">
          <button
            className="prev-but"
            disabled={
              trackHistory.length <= 1 || trackHistoryIndex === 0
            }
            onClick={ prev }
          >
            <img src="../svg/prev.svg" alt="prev" />
          </button>

          <button className="play_pause-but"
            disabled={ activeMusic === '' }
            onClick={() => {
              const aud = document.getElementsByTagName("audio")[0];
              playing ? aud.pause() : aud.play();
            }}
          >
            <img src={`../svg/${playing ? 'pause' : 'play'}.svg`} alt="play_pause" />
          </button>

          <button
            className="next-but"
            disabled={ activeMusic === '' || trackList.length === 1}

            onClick={ next }
          >
            <img src="../svg/next.svg" alt="next" />
          </button>
        </div>
      </div>

    </div>
  );
}

export default FloatingMusicTrackComps;