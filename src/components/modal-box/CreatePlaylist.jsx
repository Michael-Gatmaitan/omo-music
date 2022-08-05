import React from 'react';
import { useContext } from 'react';
import './CreatePlaylist.css';
import { EventContext } from '../../context/EventContext';
import { AudioContext } from '../../context/AudioContext';

import PlaylistForm from './PlaylistForm';

const CreatePlaylist = () => {
  
  const { showCreatePlaylist, setShowCreatePlaylist } = useContext(EventContext);
  const { yourPlaylists, createYourPlaylists } = useContext(AudioContext);

  const closeCreatePlaylistModal = () => {
    setShowCreatePlaylist(false);
  }

  let handleCreatePlaylist = (plNameVal, plImgVal) => {
    closeCreatePlaylistModal();
    
    let playlistTemp = {
      playlistID: yourPlaylists.length,    // number
      playlistName: plNameVal.trim(),      // string
      musics: [],                          // string[]
      imageLink: plImgVal.trim()           // string.trim()
    };

    createYourPlaylists(playlistTemp);
  }

  return (
    <div className="create-playlist-modal"
      style={{
        opacity: showCreatePlaylist ? 1 : 0,
        pointerEvents: showCreatePlaylist ? 'auto' : 'none',
        transform: `translateY(${showCreatePlaylist ? '0' : '20px'})`
      }}
    >

      {/* <PlaylistForm
        headerTitle=""
        closeFunction={func}
        primaryButtonFunc={func}
        closeButtonVal=""
        primaryButtonVal=""
        showAction={func}
      /> */}

      <PlaylistForm
        headerTitle="Create Playlist"
        closeFunction={ closeCreatePlaylistModal }
        primaryButtonFunc={ handleCreatePlaylist }
        closeButtonVal="Close"
        primaryButtonVal="Create"
        showHideFunc={ showCreatePlaylist }
      />

    </div>
  )
}

export default CreatePlaylist;