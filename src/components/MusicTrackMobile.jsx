import FloatingMusicTrackComps from './FloatingMusicTrackComps.jsx';
import './scss/MusicTrackMobile.css';

const MusicTrackMobile = props => {

  const { isTrackOpen, setIsTrackOpen } = props;

  return (
    <div className="music-track-mobile"
      style={{
        opacity: isTrackOpen ? 1 : 0,
        pointerEvents: isTrackOpen ? 'auto' : 'none',
        transform: `translateY(${isTrackOpen ? '0' : '20px'})`
      }}
    >
      <div className="track-nav">
        <div className="close-track" onClick={ () => setIsTrackOpen(false) }>
          <img src="../svg/floating-icons/close.svg" width="26" alt="" />
        </div>
        <img src="../svg/dark-omo-logo.svg" alt="" />
      </div>
      <FloatingMusicTrackComps />

    </div>
  );
}

export default MusicTrackMobile;