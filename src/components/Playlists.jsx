import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';
import { playlists } from '../dataSource';
import './scss/Playlists.css';

const Playlists = () => {
  const audioContext = useContext(AudioContext);
  const { favorites } = audioContext;

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

    ],

    // Your playlists
  }

  useEffect(() => console.log(playlistList.made_for_you), []);

  return (
    <div className="playlists-route">
      
      <div className="pl-header">
        Made for you
      </div>

      <div className="pl-section">
        {playlistList.made_for_you.map(pl => (
          <PlaylistBlock pl={pl} key={pl.playlistID} />
        ))}
      </div>

      <div className="divider" />

      <div className="pl-header">
        Your Playlists
      </div>

      <div className="create-pl">
        <div className="create-logo">
          <img src="../svg/create.svg" alt="" />
        </div>
        <div className="create-text">Create</div>
      </div>
    </div>
  );
}

const PlaylistBlock = ({ pl }) => {
  const { playlistID, playlistName, musics } = pl;
  return (
    <div className="pl-block">

      <Link to={`playlists/${playlistName}`}>
        
        <div className="pl-image"></div>

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