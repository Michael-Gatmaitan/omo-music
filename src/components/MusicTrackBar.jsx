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
  } = audioContext;

  const eventContext = useContext(EventContext);
  const {
    setShowMusicTrackMobile
  } = eventContext;

  const { title, artistName, path } = activeMusicInfo;

  let trackOpenAction = e => {
    const { target: t } = e;
    if (t.className.includes('music-track-bar')) {
      setShowMusicTrackMobile(true);
    }
  }

  return (
    <div className="music-track-bar"
      onClick={ trackOpenAction }
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
          <img src={`../artists-image/${path}.jpg`} alt={path} />
        </div>

        <div className="music-texts">
          {/* <div className="text-color-fade" /> */}
          <div className="music-title">{title || "OMO Music"}</div>
          <div className="music-artist-name">{artistName || "M. Gatmaitan, 2021"}</div>
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
          disabled={ activeMusic === '' || trackList.length === 1 }

          onClick={ next }
        >
          <img src="../svg/next.svg" alt="next" />
        </button>
      </div>

    </div>
  )
}

export default MusicTrackBar;
