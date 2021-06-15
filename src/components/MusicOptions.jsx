import { useContext } from 'react';
import './scss/MusicOptions.css';
import CloseButton from './Buttons/CloseButton';
import { EventContext } from '../context/EventContext';

const MusicOptions = () => {

  const {

    showMusicOptions,
    showSelectPlaylist,
    
    closeAllMusicOptions,
    setShowMusicOptions,
    setShowSelectPlaylist,
    musicOptionsData,

  } = useContext(EventContext);

  const { rawTitle, title, artist } = musicOptionsData;

  return (
    <div className="music-options-container"
      style={{
        opacity: showMusicOptions ? 1 : 0,
        pointerEvents: showMusicOptions ? 'auto' : 'none',
        transform: `translateY(${showMusicOptions ? '0' : '20px'})`
      }}
    >
      
      <div className="music-options-content">

        <MusicInfoBlock musicOptionsData={musicOptionsData} />

        <div className="options-selection-container">

          {/* Conditional Rendering will happen below  */}
          <OptionSelection />

          <CloseButton closeFunction={closeAllMusicOptions} />

        </div>

      </div>

    </div>
  )
}

const MusicInfoBlock = ({ rawTitle, title, artist }) => (
  
  <div className="music-info-block-container">
    <div className="music-info-block">{rawTitle}</div>
  </div>
);

const OptionSelection = () => (
  <div className="option-selection">

    <div className="option">
      <div className="option-icon">
        <img src="../svg/black-icons/play_next_black.svg" alt="" />
      </div>
      <div className="option-title">Add to playing queue</div>
    </div>

    <div className="option">
      <div className="option-icon">
        <img src="../svg/black-icons/heart_filled.svg" alt="" />
      </div>
      <div className="option-title">Remove to Favorites</div>
    </div>

    <div className="option">
      <div className="option-icon">
        <img src="../svg/black-icons/add_to_playlist_black.svg" alt="" />
      </div>
      <div className="option-title">Add to Playlist</div>
    </div>

  </div>
);

export default MusicOptions;