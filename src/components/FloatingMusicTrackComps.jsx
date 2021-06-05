import { useContext } from 'react';
import './scss/FloatingMusicTrackComps.css';
import { AudioContext } from '../context/AudioContext';
import { EventContext } from '../context/EventContext';

// Components
import FloatingTracklist from './FloatingTracklist';

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
    next
  } = audioContext;

  const eventContext = useContext(EventContext);
  const { setShowTracklist, setShowMusicOptions } = eventContext;

  const { title, artistName, path } = activeMusicInfo;

  let { curMin, curSec } = { curMin: Math.floor(currentTime / 60).toString(), curSec: Math.round(currentTime % 60).toString() };
  let { durMin, durSec } = { durMin: Math.floor(duration / 60).toString(), durSec: Math.round(duration % 60).toString() };

  return (
    <div className="floating-music-track">

      <FloatingTracklist />
      
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

        <div className="floating-icons">

          {/* tracklist */}
          <div className="tracklist icon-container"
            onClick={() => {
              setShowTracklist(true);
            }}
          >
            <img src={`../svg/floating-icons/tracklist.svg`} alt="" />
          </div>

          {/* heart */}
          <div className="heart icon-container">
            <img src={`../svg/floating-icons/heart_unfilled.svg`} alt="" />
          </div>

          {/* more */}
          <div className="more icon-container"
            onClick={() => {
              setShowMusicOptions(true);
            }}
          >
            <img src={`../svg/floating-icons/more.svg`} alt="" />
          </div>
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
            <div className="slider-progress-container">
              <div
                className="slider-progress"
                style={{
                  width: `${currentDurPercent}%`
                }}
              />
            </div>
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