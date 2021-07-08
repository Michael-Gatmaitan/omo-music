import React, { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { EventContext } from '../context/EventContext';
import './scss/MusicTrackBar.css';
// import { useHistory } from 'react-router-dom';

const MusicTrackBar = () => {
  const audioContext = useContext(AudioContext);
  const {
    activeMusic,
    activeMusicInfo,

    currentTime,
    duration,

    trackHistory,
    trackHistoryIndex,

    trackList,

    prev,
    next,
    playing,
    musicLoading
  } = audioContext;

  const eventContext = useContext(EventContext);
  const {
    setShowMusicTrackMobile
  } = eventContext;

  const { title, artistName, path } = activeMusicInfo;

  let handleTrackOpenAction = e => {
    const { target: t } = e;
    if (t.className.includes('music-track-bar')) {
      setShowMusicTrackMobile(true);
    }
  }

  const imgSrc = path ? `../artists-image/${path}.jpg` : "../svg/dark-omo-logo.svg";

  return (
    <div className="music-track-bar"
      onClick={ path ? handleTrackOpenAction : null }
    >

      <div className="duration-progress-container">
        <div className="duration-progress"
          style={{
            width: `${(currentTime / duration) * 100}%`,
          }}
        />
      </div>

      <div className="click-indication" />

      <div className="music-info-displays">

        <div className="music-artist-image">
          {/* {`../artists-image/${path}.jpg`} */}
          <img src={imgSrc} alt="" />
        </div>

        <div className="music-texts">
          <div className="music-title">{title || "OMO Music"}</div>
          <div className="music-artist-name">{artistName || "M. Gatmaitan, 2021"}</div>
        </div>
      </div>

      <div className="music-track-events">
        <button
          className="prev-but"
          disabled={ trackHistory.length <= 1 || trackHistoryIndex === 0}
          onClick={ prev }
        >
          <img src="../svg/prev.svg" alt="prev" />
        </button>

        <button className="play_pause-but"
          disabled={ !activeMusic }
          onClick={() => {
            const aud = document.getElementsByTagName("audio")[0];
            playing ? aud.pause() : aud.play();
          }}
        >
          {musicLoading ? "loading"
          : <img
            src={`../svg/${playing ? 'pause' : 'play'}.svg`}
            alt=""
          />}
        </button>

        <button
          className="next-but"
          disabled={ !activeMusic || trackList.length === 1 }

          onClick={ next }
        >
          <img src="../svg/next.svg" alt="next" />
        </button>
      </div>

    </div>
  )
}

export default MusicTrackBar;
