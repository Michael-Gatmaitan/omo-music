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

  // eslint-disable-next-line
  // let [yourPlaylists, setYourPlaylists] = useState(JSON.parse(localStorage.getItem("yourPlaylists")) || [
    // {
    //   playlistID: 0,
    //   playlistName: "Working",
    //   musics: [
    //     "Avril Lavigne - Complicated.mp3"
    //   ]
    // }
  // ]);

  useEffect(() => {
    localStorage.setItem("yourPlaylists", JSON.stringify(yourPlaylists));
  }, [yourPlaylists]);

  return (
    <div className="playlists-route">
      
      <div className="pl-header">
        Made for you
      </div>

      <div className="pl-section">
        {playlistList.made_for_you.map(pl => (
          <PlaylistBlock pl={pl} key={pl.playlistID} hasImageLink={false} />
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
      
      <div className="pl-section">
        {yourPlaylists.map(pl => (
          <PlaylistBlock pl={pl} key={pl.playlistID} hasImageLink={true} />
        ))}
      </div>

    </div>
  );
}

const PlaylistBlock = ({ pl, hasImageLink }) => {
  const { playlistName, musics } = pl;
  return (
    <div className="pl-block">
      <Link to={`playlists/${playlistName}`}>
        
        <div className="pl-image">
          {hasImageLink ?
          pl.imageLink === "" ? <img src="../svg/omo-logo.svg" className="svg" alt="" />
          : <img src={pl.imageLink} className="link" alt="" />
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
    </div>
  )
}

// const PlaylistTrack = () => {
//   return (
//     <div className=""></div>
//   )
// }

export default Playlists;