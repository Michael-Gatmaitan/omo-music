import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { EventContext } from '../context/EventContext';
import './scss/MoreMusicOptions.css';

const MoreMusicOptions = () => {

  const audioContext = useContext(AudioContext);
  // 

  const eventContext = useContext(EventContext);
  // 

  return (
    <div className="more-music-options">
      <div className="options-content">

        <div className="option-head">

          <div className="option-artist-image">
            <img src="../artists-image/paramore.jpg" alt="" />

            <div className="option-artist-info">
              <div className="music-title">Decode</div>
              <div className="music-artist">Paramore</div>
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

          <div className="sound option">
          
            <div className="option-icon">
              <img src="../svg/floating-icons/tracklist.svg" alt="" />
            </div>
            <div className="option-selection"></div>

          </div>

          <div className="sound option">
          
            <div className="option-icon">
              <img src="../svg/floating-icons/tracklist.svg" alt="" />
            </div>
            <div className="option-selection"></div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default MoreMusicOptions;