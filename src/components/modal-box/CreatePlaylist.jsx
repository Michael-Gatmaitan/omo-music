import { useState, useContext, useEffect, useRef } from 'react';
import '../scss/CreatePlaylist.css';
import CloseButton from '../buttons/CloseButton';
import { EventContext } from '../../context/EventContext';
import { AudioContext } from '../../context/AudioContext';
import { playlists } from '../../dataSource';

const CreatePlaylist = () => {
  
  const { showCreatePlaylist, setShowCreatePlaylist } = useContext(EventContext);
  const { yourPlaylists, updateYourPlaylists } = useContext(AudioContext);
  
  let [playlistNames, setPlaylistNames] = useState([]);
  
  useEffect(() => {
    let playlistNamesTemp = yourPlaylists.map(e => e.playlistName);
    let madeForYouPlaylists = playlists.map(e => e.playlistName);
    
    setPlaylistNames([...playlistNamesTemp, ...madeForYouPlaylists]);
  }, [yourPlaylists]);

  // Errors and warnings
  let [titleExist, setTitleExist] = useState(false);
  let [titleEmpty, setTitleEmpty] = useState(true);
  let [invalidChar, setInvalidChar] = useState(false);

  let inputText = useRef(null);
  let imageLinkVal = useRef(null);

  useEffect(() => {
    imageLinkVal.value = "";
    inputText.value = "";
    setTitleEmpty(true);
  }, [showCreatePlaylist]);

  const closeModal = () => {
    setShowCreatePlaylist(false);
  }
  
  let handleChange = ({ target }) => {
    let val = target.value.trim();

    if (val === "") {
      setTitleExist(false);
      setTitleEmpty(true);
      setInvalidChar(false);
    } else {
      setTitleEmpty(false);

      if (playlistNames.includes(val)) {
        setTitleExist(true);
      } else if (val.includes("/") || val.includes("#") || val.includes("?") || val.includes("%")) {
        setInvalidChar(true);
      } else {
        setInvalidChar(false);
        setTitleExist(false);

        return val;
      }
    }
  };

  let handleCreatePlaylist = (val) => {
    let playlistTemp = {
      playlistID: yourPlaylists.length,    // number
      playlistName: val,                   // string
      musics: [],                          // string[]
      imageLink: imageLinkVal.value.trim() // string.trim()
    };

    updateYourPlaylists(playlistTemp);
    closeModal();
  }

  return (
    <div className="create-playlist-modal"
      style={{
        opacity: showCreatePlaylist ? 1 : 0,
        pointerEvents: showCreatePlaylist ? 'auto' : 'none',
        transform: `translateY(${showCreatePlaylist ? '0' : '20px'})`
      }}
    >

      <div className="create-playlist-content">
        <div className="header">Create Playlist</div>
        <div className="input-field">
          <div className="input-con">
            <input
              type="text"
              placeholder="Playlist Title"
              name="playlistname"
              id="create-playlist"
              maxLength="20"
              onChange={ handleChange }
              ref={ e => inputText = e }
            />
          </div>

        </div>
        {titleExist ? <div className="error">
          Playlist Title alread existed.
        </div> : ""}
        {titleEmpty ? <div className="warning">
          Playlist Title cannot be empty.
        </div> : ""}
        {invalidChar ? <div className="error">
          Playlist Title cannot include "/", "#", "?" or "%".
        </div> : ""}
        <div className="image-link-con">
          <input
            type="text"
            placeholder="Image Link"
            name="image-link"
            id="image-link"
            // onChange={ }
            ref={ e => imageLinkVal = e }
          />
        </div>
        <div className="button-option">
          <CloseButton value="Cancel" closeFunction={ closeModal }/>

          <div className="but-con">
            <button
              disabled={ titleExist || titleEmpty || invalidChar }
              className="create"
              onClick={() => handleCreatePlaylist(inputText.value) }
            >Create</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreatePlaylist;