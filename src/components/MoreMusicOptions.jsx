import { useContext, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';
import { EventContext } from '../context/EventContext';
import './scss/MoreMusicOptions.css';

const MoreMusicOptions = () => {

  const audioContext = useContext(AudioContext);
  // 
  const { activeMusicInfo } = audioContext;

  const eventContext = useContext(EventContext);
  const {
    setShowMusicTrackMobile,
    
    showMusicOptions,
    setShowMusicOptions
  } = eventContext;
  // 

  useEffect(() => {
    document.body.style.overflowY = showMusicOptions ? 'hidden' : 'auto';
  }, [showMusicOptions]);

  const { url } = useRouteMatch();

  const { path, title, artistName } = activeMusicInfo;

  return (
    <div className="more-music-options"
      style={{
        opacity: showMusicOptions ? 1 : 0,
        pointerEvents: showMusicOptions ? 'auto' : 'none',
        transform: `translateY(${showMusicOptions ? '0' : '20px'})`
      }}
    >
      <div className="options-content">

        <div className="option-head">

          <div className="option-artist-image">
            <img src={`${url}/artist/${path}.jpg`} alt="" />

            <div className="option-artist-info">
              <div className="music-title">{title}</div>
              <div className="music-artist">{artistName}</div>
            </div>
          </div>

        </div>

        <div className="option-body">

          <div className="sound option">
          
            <div className="option-icon">
              <img src="../svg/floating-icons/tracklist.svg" alt="" />
            </div>
            <div className="option-selection"></div>

          </div>

          <div className="favourite option">
          
            <div className="option-icon">
              <img src="../svg/floating-icons/heart_filled.svg" alt="" />
            </div>
            <div className="option-selection"></div>

          </div>

          <div className="gotoArtist option">
          
            <div className="option-icon">
              <img src="../svg/floating-icons/tracklist.svg" alt="" />
            </div>
            <div className="option-selection"
              onClick={ _ => {
                setShowMusicTrackMobile(false);
                setShowMusicOptions(false);
              }}
            >
              <Link to={`artists/${path}`}>
                Go to {artistName}
              </Link>
            </div>

          </div>

          <div className="close-tracklist close-modal"
            onClick={ _ => setShowMusicOptions(false) }
          >
            Close
          </div>

        </div>

      </div>
    </div>
  );
}

export default MoreMusicOptions;