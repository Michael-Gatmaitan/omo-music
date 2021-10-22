// @ts-nocheck
import { useContext } from 'react';
import { EventContext } from '../../context/EventContext';
import { AudioContext } from '../../context/AudioContext';
import CloseButton from '../Buttons/CloseButton';
import './PlaylistOptions.css';

// 
import PlaylistForm from './PlaylistForm';

const PlaylistOptions = () => {

  const {
    showPlaylistOptions,
    playlistOptionsData,

    // Variables
    showEditPlaylist,
    showDeletePlaylist

  } = useContext(EventContext);

  const { playlistName, imageLink } = playlistOptionsData;

  const playlistOptionsStyle = {
    opacity: showPlaylistOptions ? 1 : 0,
    pointerEvents: showPlaylistOptions ? 'auto' : 'none',
    transform: `translateY(${showPlaylistOptions ? '0' : '20px'})`
  };

  return (
    <div className="playlist-options-container"
      style={playlistOptionsStyle}
    >

      <div className="playlist-options-content">
        
        <div className="header"
          style={{
            display: (showEditPlaylist || showDeletePlaylist) ? "none" : "block"
          }}
        >
          {playlistName}
        </div>

        <div className="option-selection-container">
          {(showEditPlaylist || showDeletePlaylist) ?
            showEditPlaylist ? <EditPlaylist /> : <DeletePlaylist />
          : <OptionSelection />}
        </div>

      </div>

      
    </div>
  )
}

const OptionSelection = () => {

  const {
    setShowEditPlaylist,
    setShowDeletePlaylist,
    
    closeAllPlaylistOptions
  } = useContext(EventContext);

  return (
    <>
      <div className="option-selection">

        <div className="option"
          onClick={ () => setShowEditPlaylist(true) }
        >
          <div className="option-icon">
            {/* svg */}
            <img src="../svg/edit.svg" alt="" />
          </div>

          <div className="option-title">Edit Playlist</div>
        </div>

        <div className="option"
          onClick={ () => setShowDeletePlaylist(true) }
        >
          <div className="option-icon">
            {/* svg */}
            <img src="../svg/delete.svg" alt="" />

          </div>

          <div className="option-title">Delete Playlist</div>
        </div>
        
      </div>

      <div className="bottom-buttons">
        <CloseButton closeFunction={ closeAllPlaylistOptions } />
      </div>
    </>
  )
}

const EditPlaylist = () => {
  
  /* <PlaylistForm
    headerTitle=""
    closeFunction={func}
    primaryButtonFunc={func}
    closeButtonVal=""
    primaryButtonVal=""
    showHideFunc={func}
  /> */

  const {
    showPlaylistOptions,
    playlistOptionsData,
    closeAllPlaylistOptions,
  } = useContext(EventContext);

  const { playlistID, playlistName, imageLink } = playlistOptionsData;

  const {
    yourPlaylists,
    editYourPlaylists,
  } = useContext(AudioContext);

  const handleEditPlaylist = (plNameVal, plImgVal) => {
    closeAllPlaylistOptions();

    let editingPlaylistIndex = yourPlaylists.indexOf(yourPlaylists.filter(e => e.playlistID === playlistID)[0]);

    let playlistTemp = {
      playlistName: plNameVal.trim(),
      musics: [...yourPlaylists[editingPlaylistIndex].musics],                          // string[]
      imageLink: plImgVal.trim()
    };

    editYourPlaylists(editingPlaylistIndex, playlistTemp);
  }

  return (
    <PlaylistForm
      headerTitle={`Edit Playlist "${playlistName}"`}
      closeFunction={ closeAllPlaylistOptions }
      primaryButtonFunc={ handleEditPlaylist }
      closeButtonVal="Cancel"
      primaryButtonVal="Edit"
      showHideFunc={ showPlaylistOptions }

      editMode={ true }
      playlistNameVal={ playlistName }
      playlistImageLinkVal={ imageLink }
    />
  )
}

const DeletePlaylist = () => {

  const { deleteYourPlaylists, yourPlaylists } = useContext(AudioContext);
  const {
    playlistOptionsData,
    closeAllPlaylistOptions
  } = useContext(EventContext);

  const { playlistName } = playlistOptionsData;

  const findObjToDelete = (_plName) => {
    closeAllPlaylistOptions();
    
    let obj = yourPlaylists.find(e => e.playlistName === _plName);
    let index = yourPlaylists.indexOf(obj);
    let objToDelete = yourPlaylists[index];

    deleteYourPlaylists(objToDelete);
  }

  return (
    <div className="delete-playlist-content">
      <div className="header delete-header">Delete Playlist</div>
      <div className="delete-message">
      “{playlistName}” will be deleted.
      </div>

      <div className="bottom-buttons">
        <CloseButton value="Cancel" closeFunction={ closeAllPlaylistOptions } />
        <button className="delete-button" onClick={ () => findObjToDelete(playlistName) }>
          Delete
        </button>
      </div>
    </div>
  )
}

export default PlaylistOptions;