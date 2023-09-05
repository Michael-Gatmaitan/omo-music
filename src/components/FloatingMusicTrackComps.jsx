import { useContext, useState, useEffect, useMemo } from "react";
import "./scss/FloatingMusicTrackComps.css";
import { AudioContext } from "../context/AudioContext";
import { EventContext } from "../context/EventContext";
import { Link } from "react-router-dom";

// Components
import FloatingTracklist from "./FloatingTracklist";
import SeekBar from "./seek-bar/SeekBar";

// const calcPercent = (curT, tDur) => (curT / tDur) * 100;

const FloatingMusicTrackComps = () => {
  const {
    activeMusicRawTitle,
    activeMusicInfo,
    currentTime,
    duration,

    trackList,

    trackHistory,
    trackHistoryIndex,
    prev,
    activeMusic,
    playing,
    next,

    favorites,
    updateFavorites,

    musicLoading,

    shuffle,
    // order,
    changeMusicEndState,
  } = useContext(AudioContext);

  const {
    setShowTracklist,
    setShowMusicTrackMobile,
    setShowMusicOptions,
    setMusicOptionsData,
  } = useContext(EventContext);

  const { title, artistName, path } = activeMusicInfo;

  let { curMin, curSec } = {
    curMin: Math.floor(currentTime / 60).toString(),
    curSec: Math.round(currentTime % 60).toString(),
  };

  let { durMin, durSec } = {
    durMin: Math.floor(duration / 60).toString(),
    durSec: Math.round(duration % 60).toString(),
  };

  let [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    if (activeMusicRawTitle)
      setIsInFavorites(favorites.includes(activeMusicRawTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMusicRawTitle, favorites]);

  const iconStyle = useMemo(() => {
    return {
      opacity: activeMusic ? 1 : 0.3,
      display: activeMusic ? "block" : "none",
    };
  }, [activeMusic]);

  return (
    <div className='floating-music-track'>
      <FloatingTracklist />

      <div className='artist-image-bg'>
        <img src={`/artists-image/${path}.jpg`} alt='' />
      </div>

      <div className='blur-bg' />

      <div className='floating-childs-parent'>
        <div
          className='floating-artist-image-container'
          style={{ opacity: path ? 1 : 0 }}
        >
          <img src={`/artists-image/${path}.jpg`} alt='' />
        </div>

        <div className='floating-music-info'>
          <Link
            to={`../music-data/${path}/${activeMusicRawTitle}`}
            target='_blank'
            download
          >
            <div className='music-title-container'>
              <div className='music-title'>{title || "OMO Music"}</div>
            </div>
          </Link>

          <Link
            to={`/artists/${path}`}
            onClick={() => setShowMusicTrackMobile(false)}
          >
            <div className='artist-name'>
              {artistName || "M. Gatmaitan, 2021"}
            </div>
          </Link>
        </div>

        <div className='floating-icons'>
          {/* tracklist */}
          <div
            className='tracklist icon-container'
            onClick={() => setShowTracklist(true)}
            style={iconStyle}
          >
            <img
              className='icon'
              src={`/svg/floating-icons/tracklist.svg`}
              alt=''
            />
          </div>

          {/* Shuffle / Order */}
          <div
            className='shuf-ord icon-container'
            onClick={changeMusicEndState}
            style={{
              ...iconStyle,
              opacity: activeMusic ? (shuffle ? 1 : 0.3) : 0.3,
            }}
          >
            <img
              className='icon'
              src={`/svg/floating-icons/shuffle.svg`}
              alt=''
            />
          </div>

          {/* heart */}
          <div
            className='heart icon-container'
            onClick={() => updateFavorites(activeMusicRawTitle)}
            style={iconStyle}
          >
            <img
              className='icon'
              src={`/svg/floating-icons/heart_${
                isInFavorites ? "filled" : "unfilled"
              }.svg`}
              alt=''
            />
          </div>

          {/* More */}
          <div
            className='more icon-container'
            onClick={() => {
              setShowMusicOptions(activeMusicRawTitle);
              setMusicOptionsData(
                `${artistName} - ${title}.mp3`,
                title,
                artistName
              );
            }}
            style={iconStyle}
          >
            <img className='icon' src={`/svg/floating-icons/more.svg`} alt='' />
          </div>
        </div>

        <div className='floating-seekbar'>
          <div className='current-time seekbar-times'>
            {`${curMin.length === 2 ? curMin : `0${curMin}`}`}:
            {`${curSec.length === 2 ? curSec : `0${curSec}`}`}
          </div>

          <div className='seekbar-container'>
            <SeekBar currentTime={currentTime} duration={duration} />
          </div>

          <div className='total-time seekbar-times'>
            {`${durMin.length === 2 ? durMin : `0${durMin}`}`}:
            {`${durSec.length === 2 ? durSec : `0${durSec}`}`}
          </div>
        </div>

        <div className='music-track-events'>
          <button
            className='prev-but'
            disabled={trackHistory.length <= 1 || trackHistoryIndex === 0}
            onClick={prev}
          >
            <img className='icon' src={`/svg/prev.svg`} alt='prev' />
          </button>

          <button
            className='play_pause-but'
            disabled={!activeMusic || musicLoading}
            onClick={() => {
              const aud = document.getElementsByTagName("audio")[0];
              playing ? aud.pause() : aud.play();
            }}
          >
            {musicLoading ? (
              "loading"
            ) : (
              <img
                className='icon'
                src={`/svg/${playing ? "pause" : "play"}.svg`}
                alt='play_pause'
              />
            )}
          </button>

          <button
            className='next-but'
            disabled={!activeMusic || trackList.length === 1}
            onClick={next}
          >
            <img className='icon' src={`/svg/next.svg`} alt='next' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingMusicTrackComps;
