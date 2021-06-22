import { useState, useContext, useEffect, useRef } from 'react';
import '../scss/CreatePlaylist.css';
import CloseButton from '../buttons/CloseButton';
import { EventContext } from '../../context/EventContext';
import { AudioContext } from '../../context/AudioContext';

const CreatePlaylist = () => {
  
  const { showCreatePlaylist, setShowCreatePlaylist } = useContext(EventContext);
  const { yourPlaylists, updateYourPlaylists } = useContext(AudioContext);
  
  let [playlistNames, setPlaylistNames] = useState([]);
  
  useEffect(() => {
    let playlistNamesTemp = yourPlaylists.map(e => e.playlistName);
    setPlaylistNames(playlistNamesTemp);
  }, [yourPlaylists]);
  
  // error
  let [titleExist, setTitleExist] = useState(false);
  
  // warning
  let [titleEmpty, setTitleEmpty] = useState(true);

  let inputText = useRef(null);

  const closeModal = () => {
    setShowCreatePlaylist(false);
    inputText.value = "";
  }

  let [playlistTitle, setPlaylistTitle] = useState("");
  let handleChange = e => {
    let val = e.target.value;
    val = val.trim();

    if (val === "") {
      setTitleExist(false);
      setTitleEmpty(true);
    } else {

      setTitleEmpty(false);

      if (playlistNames.includes(val)) {
        setTitleExist(true);
        console.log("Title exists");
      } else {
        setTitleExist(false);
        console.log("Passed.");

        return val;
      }
    }
  };

  let handleCreatePlaylist = (val) => {
    let playlistTemp = {
      playlistID: yourPlaylists.length,
      playlistName: val,
      musics: []
    };
    // playlistID: 1,
    //   playlistName: "Coding vibes",
    //   musics: [
    //     "Coldplay - Paradise.mp3",
    //     "Avicii - Fades Away.mp3"
    //   ]
    // }
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
              onChange={ handleChange }
              ref={ e => inputText = e }
            />
          </div>
          
        </div>

        {titleExist ? <div className="error">
          Playlist Title alread existed.
        </div> : ""}
        {titleEmpty ?<div className="warning">
          Playlist Title cannot be empty.
        </div> : ""}

        <div className="button-option">
          <CloseButton value="Cancel" closeFunction={ closeModal }/>

          <div className="but-con">
            <button
              disabled={ titleExist || titleEmpty }
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