import { useContext, useState, useEffect, useMemo } from 'react';
import './scss/FloatingMusicTrackComps.css';
import { AudioContext } from '../context/AudioContext';
import { EventContext } from '../context/EventContext';

// Components
import FloatingTracklist from './FloatingTracklist';

const calculatePercentage = (currentTime, totalDur) => {
			// this.state.currentTime / this.state.duration) * 100
    return (currentTime / totalDur) * 100;
}

const FloatingMusicTrackComps = () => {

  const audioContext = useContext(AudioContext);
  const {
    activeMusicRawTitle,
    activeMusicInfo,
    currentTime,
    duration,
    // currentDurPercent,

    trackList,

    trackHistory,
    trackHistoryIndex,
    prev,
    activeMusic,
    playing,
    next,

    favorites,
    updateFavorites,
  } = audioContext;

  const eventContext = useContext(EventContext);
  const { setShowTracklist } = eventContext;

  const { title, artistName, path } = activeMusicInfo;

  let { curMin, curSec } = { curMin: Math.floor(currentTime / 60).toString(), curSec: Math.round(currentTime % 60).toString() };
  let { durMin, durSec } = { durMin: Math.floor(duration / 60).toString(), durSec: Math.round(duration % 60).toString() };

  let [isInFavorites, setIsInFavorites] = useState(false);

  // let [durationPercent, setDurationPercent] = useState();

  let durationPercent = useMemo(() => {
    return calculatePercentage(currentTime, duration);

    // eslint-disable-next-line
  }, [currentTime]);
  
  useEffect(() => {

    if (activeMusicRawTitle !== '') {
      if (favorites.includes(activeMusicRawTitle))
        setIsInFavorites(true);
      else
        setIsInFavorites(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMusicRawTitle, favorites]);

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
            onClick={() => setShowTracklist(true) }
          >
            <img src={`../svg/floating-icons/tracklist.svg`} alt="" />
          </div>

          {/* heart */}
          <div className="heart icon-container"
            onClick={() => updateFavorites(activeMusicRawTitle) }
          >
            <img src={`../svg/floating-icons/heart_${isInFavorites ? 'filled' : 'unfilled'}.svg`} alt="" />
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
                  width: `${durationPercent}%`
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