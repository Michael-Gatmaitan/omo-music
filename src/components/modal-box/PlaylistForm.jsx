// @ts-nocheck
import { useEffect, useState, useRef, useContext } from 'react';
import CloseButton from '../Buttons/CloseButton';
import { playlists } from '../../dataSource';
import { AudioContext } from '../../context/AudioContext';
import './PlaylistForm.css';

const PlaylistFrom = props => {

  /* <PlaylistForm
    headerTitle=""
    closeFunction={func}
    primaryButtonFunc={func}
    closeButtonVal=""
    primaryButtonVal=""
    showHideFunc={func}
  /> */

  const {
    headerTitle,
    closeFunction,
    primaryButtonFunc,
    closeButtonVal,
    primaryButtonVal,
    showHideFunc,

    editMode,
    playlistNameVal,
    playlistImageLinkVal
  } = props;

  const { yourPlaylists } = useContext(AudioContext);
  
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
  }, [showHideFunc]);

  let handleTypingChecker = ({ target }) => {
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
  }

  return (
    <>
    {/* code below will be PlaylistForm.js to reuse it on edit playlist */}
      {/* Skeleton of Component below */}
          
        {/* <PlaylistForm
          headerTitle=""
          closeFunction={func}
          primaryButtonFunc={func}
          closeButtonVal=""
          primaryButtonVal=""
          showHideFunc={func}
        /> */}

      <div className={`playlist-form-content ${editMode ? "edit-mode" : ""}`}
      >
        <div className="header">{headerTitle}</div>
        <div className="input-field">
          <div className="input-con">
            <input
              type="text"
              name="playlistname"
              id="create-playlist"
              maxLength="20"
              onChange={ handleTypingChecker }
              placeholder={editMode ? playlistNameVal : "Playlist Title"}
              ref={ e => inputText = e }
            />
          </div>

          {titleExist &&
          <div className="error">
            Playlist Title already existed.
          </div>}
          {titleEmpty &&
          <div className="warning">
            Playlist Title cannot be empty.
          </div>}
          {invalidChar &&
          <div className="error">
            Playlist Title cannot include "/", "#", "?" or "%".
          </div>}

          <div className="image-link-con">
            <input
              type="text"
              name="image-link"
              id="image-link"
              // onChange={ }
              placeholder={editMode ? playlistImageLinkVal : "Image Link"}
              ref={ e => imageLinkVal = e }
            />
          </div>

          <div className="button-option">
            <CloseButton value={closeButtonVal} closeFunction={ closeFunction }/>

            <div className="but-con">
              <button
                disabled={ titleExist || titleEmpty || invalidChar }
                className="create"
                onClick={() => primaryButtonFunc(inputText.value, imageLinkVal.value) }
              >{primaryButtonVal}</button>
            </div>
          </div>

        </div>
        
        
      </div>
    </>
  )
}

export default PlaylistFrom;