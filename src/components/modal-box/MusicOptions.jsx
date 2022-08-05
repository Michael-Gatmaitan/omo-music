// @ts-nocheck
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MusicOptions.css';
import CloseButton from '../Buttons/CloseButton';
import { AudioContext } from '../../context/AudioContext';
import { EventContext } from '../../context/EventContext';

const MusicOptions = () => {

  const {

    showMusicOptions,
    showSelectPlaylist,
    
    closeAllMusicOptions,
    // setShowMusicOptions,
    setShowSelectPlaylist,
    musicOptionsData,

  } = useContext(EventContext);
  
  const {
    favorites,
    updateFavorites,
    addQueue
  } = useContext(AudioContext);

  const musicOptionsStyle = {
    opacity: showMusicOptions ? 1 : 0,
    pointerEvents: showMusicOptions ? 'auto' : 'none',
    transform: `translateY(${showMusicOptions ? '0' : '20px'})`
  };

  const { rawTitle, artist } = musicOptionsData;
  const artistFolder = artist.toLowerCase().replaceAll(" ", "-");
  
  return (
    <div className="music-options-container"
      style={musicOptionsStyle}
    >
      
      <div className="music-options-content">

        <MusicInfoBlock musicOptionsData={musicOptionsData} />

        <div className="options-selection-container">

          { showSelectPlaylist ?
            <SelectPlaylist /> :
            <OptionSelection
              setShowSelectPlaylist={setShowSelectPlaylist}
              favorites={favorites}
              musicOptionsData={musicOptionsData}
              updateFavorites={updateFavorites}
              closeAllMusicOptions={closeAllMusicOptions}
              addQueue={addQueue}
              showMusicOptions={showMusicOptions}
            />
          }

          <div className="bottom-buttons">
            <CloseButton closeFunction={closeAllMusicOptions} />
            <Link
              to={`../../music-data/${artistFolder}/${rawTitle}`}
              // rel="noopener noreferrer"
              target="_blank"
              download
            >
              <button className="download-music-button" onClick={ closeAllMusicOptions }>
                <img src="../svg/download.svg" alt="" />
              </button>
            </Link>
          </div>

        </div>

      </div>

    </div>
  )
}

const MusicInfoBlock = ({ musicOptionsData }) => {
  
  const { title, artist } = musicOptionsData;
  const artistImage = artist.replaceAll(" ", "-");

  return (
    <div className="music-info-block-container">
      
      <div className="music-info-block">
        <img
          src={`../artists-image/${artistImage}.jpg`}
          alt=""
        />

        <div className="darken-bg">
          <div className="music-info">
            <div className="title">{title}</div>
            <div className="artist">{artist}</div>
          </div>
        </div>
      </div>

    </div>
  )
}

const OptionSelection = props => {
  const {
    setShowSelectPlaylist,
    favorites,
    musicOptionsData,
    updateFavorites,
    closeAllMusicOptions,
    addQueue,
    showMusicOptions
  } = props;

  let [isInFavorites, setIsInFavorites] = useState(false);
  let { rawTitle } = musicOptionsData;

  // eslint-disable-next-line
  useEffect(() => setIsInFavorites(favorites.includes(rawTitle)), [favorites, showMusicOptions]);

  return (
    <div className="option-selection">

      <div className="option" onClick={
        () => {
          addQueue(rawTitle);
          closeAllMusicOptions();
        }
      }>
        <div className="option-icon">
          <img src="../svg/black-icons/play_next_black.svg" alt="" />
        </div>
        <div className="option-title">Add to playing queue</div>
      </div>

      <div className="option" onClick={
        () => {
          updateFavorites(rawTitle);
          closeAllMusicOptions();
        }
      }>
        <div className="option-icon">
          <img
            src={`../svg/black-icons/${isInFavorites ? "heart_filled" : "heart_unfilled"}.svg`}
            alt=""
          />
        </div>
        <div className="option-title">{isInFavorites ? "Remove" : "Add"} to Favorites</div>
      </div>

      <div className="option" onClick={ () => setShowSelectPlaylist(true) }>
        <div className="option-icon">
          <img src="../svg/black-icons/add_to_playlist_black.svg" alt="" />
        </div>
        <div className="option-title">Add to Playlist</div>
      </div>

    </div>
  )
}

const SelectPlaylist = () => {
  const { yourPlaylists, updatePlaylistMusics } = useContext(AudioContext);
  const {
    musicOptionsData,
    closeAllMusicOptions
  } = useContext(EventContext);
  
  const { rawTitle } = musicOptionsData;

  let addMusicToPlaylist = (obj, rawTitle) => {
    updatePlaylistMusics(obj, rawTitle);
    closeAllMusicOptions();
  }

  return (
    <div className="select-playlist">
      <div className="playlist-option-container">
        {yourPlaylists.map((obj, i) => (
          <div
            className="playlist-option"
            onClick={() => addMusicToPlaylist(obj, rawTitle)}
            key={i}
          >{obj.playlistName}</div>
        ))}
      </div>
    </div>
  )
};

export default MusicOptions;