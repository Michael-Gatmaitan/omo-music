import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';
import { EventContext } from '../context/EventContext';
import { playlists } from '../dataSource';
import './scss/Playlists.css';

const Playlists = () => {
  const { favorites, yourPlaylists } = useContext(AudioContext);
  const { setShowCreatePlaylist } = useContext(EventContext);
  let playlistList = {
    made_for_you: [
      
      {
        playlistID: playlists.length,
        playlistName: "Favorites",
        musics: [
          ...favorites
        ]
      },

      ...playlists

    ]
  };

  useEffect(() => {
    localStorage.setItem("yourPlaylists", JSON.stringify(yourPlaylists));
  }, [yourPlaylists]);

  return (
    <div className="playlists-route">
      
      <div className="pl-header">
        Made for you
      </div>

      {/* Built-in playlist like [Favorites, OPM, etc...] */}
      <div className="pl-section">
        {playlistList.made_for_you.map(pl => (
          <PlaylistBlock pl={pl} key={pl.playlistID} hasImageLink={false} deletable={false} />
        ))}
      </div>

      <div className="divider" />

      <div className="pl-header">
        Your Playlists
      </div>

      <div className="create-pl" onClick={() => {
        setShowCreatePlaylist(true);
        document.getElementById("create-playlist").focus();
      }}>
        <div className="create-logo">
          <img src="../svg/create.svg" alt="" />
        </div>
        <div className="create-text">Create Playlist</div>
      </div>
      
      {/* Custom-built playlist by user */}
      <div className="pl-section">
        {yourPlaylists.map(pl => (
          <PlaylistBlock pl={pl} key={pl.playlistID} hasImageLink={true} deletable={true} />
        ))}
      </div>

    </div>
  );
}

const PlaylistBlock = ({ pl, hasImageLink, deletable }) => {
  const {
    setPlaylistOptionsData,
    setShowPlaylistOptions
  } = useContext(EventContext);

  const { playlistID, playlistName, imageLink, musics } = pl;

  return (
    <div className="pl-block">
      <Link to={`playlists/${playlistName}`}>
        
        <div className="pl-image">
          {hasImageLink ?
          imageLink === "" ? <img src="../svg/omo-logo.svg" className="svg" alt="" />
          : <img src={imageLink} className="link" alt="" />
          : <img src="../svg/omo-logo.svg" className="svg" alt="" />}
        </div>

        <div className="pl-info">
          <div className="name">
            {playlistName}
          </div>
          <div className="song-len">
            {musics.length} Songs
          </div>
        </div>

      </Link>
      
      {deletable ?

      <div
        className="music-options-parent"
        onClick={ 
          () => {
            setPlaylistOptionsData(playlistID, playlistName, imageLink);
            setShowPlaylistOptions(true);
          }
        }
      >
        <div className="music-options-button">
          <img src="../svg/floating-icons/more.svg" className="options" alt="" />
        </div>
      </div>
      
      : ""}

    </div>
  )
}

// const PlaylistTrack = () => {
//   return (
//     <div className=""></div>
//   )
// }

export default Playlists;