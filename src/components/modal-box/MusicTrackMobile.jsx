import React, { useContext } from 'react';
import { EventContext } from '../../context/EventContext';
import FloatingMusicTrackComps from '../FloatingMusicTrackComps.jsx';
import '../scss/MusicTrackMobile.css';

const { PUBLIC_URL } = process.env;

const MusicTrackMobile = () => {
  const {
    showMusicTrackMobile,
    setShowMusicTrackMobile
  } = useContext(EventContext);

  return (
    <div className="music-track-mobile"
      style={{
        opacity: showMusicTrackMobile ? 1 : 0,
        pointerEvents: showMusicTrackMobile ? 'auto' : 'none',
        transform: `translateY(${showMusicTrackMobile ? '0' : '20px'})`
      }}
    >
      <div className="track-nav">
        <div className="close-track" onClick={ () => setShowMusicTrackMobile(false) }>
          <img src={`${PUBLIC_URL}/svg/floating-icons/close.svg`} width="26" alt="" />
        </div>
        <img src={`${PUBLIC_URL}/svg/dark-omo-logo.svg`} alt="" />
      </div>
      <FloatingMusicTrackComps />

    </div>
  );
}

export default MusicTrackMobile;