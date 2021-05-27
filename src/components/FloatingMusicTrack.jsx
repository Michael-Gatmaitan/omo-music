import FloatingMusicTrackComps from './FloatingMusicTrackComps.jsx';
import './scss/FloatingMusicTrack.css';

const FloatingMusicTrack = () => {


  return (
    <div className="floating-music-track-container">
      <div className="now-playing-header">Now Playing</div>

      <FloatingMusicTrackComps />
    </div>
  )
}

export default FloatingMusicTrack;
