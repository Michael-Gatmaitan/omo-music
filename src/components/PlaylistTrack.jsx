import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';
// import { EventContext } from '../context/EventContext';
import { playlists } from '../dataSource'; 

import MusicBlock from './MusicBlock';

const PlaylistTrack = () => {

  const { favorites, yourPlaylists } = useContext(AudioContext);
  // const { setMusicOptionsData } = useContext(EventContext);
  let [isInCustomPlaylist, setIsInCustomPlaylist] = useState(false);

  const { playlistID: playlistParam } = useParams();

  // Checking if the
  // current page is a custom created playlist
  useEffect(() => {
    let yourPlaylistsTemp = [...yourPlaylists];
    
    for (let i of yourPlaylistsTemp) {
      if (playlistParam === i.playlistName) {
        setIsInCustomPlaylist(true);
        break;
      }
    }
    // eslint-disable-next-line
  }, [yourPlaylists]);

  let [dataTable, setDataTable] = useState([]);
  /* If the current page is "favorites"
     We will get the dataTable in states
     of AudioContext */
  useEffect(() => {
    if (playlistParam === "Favorites") {
      setDataTable(favorites);
    } else {
      // The data will be searched in made_for_you playlists except in "Favorites";
      let searchedPlaylist =
        playlists.find(e => e.playlistName === playlistParam) ||
        JSON.parse(localStorage.getItem("yourPlaylists"))
          .find(e => e.playlistName === playlistParam) ||
        (function() {
          console.error("Playlist cannot found.");
          return new Error("Playlist didn't found.");
        })();

      setDataTable(searchedPlaylist.musics);
    }
    
    // eslint-disable-next-line
  }, []);

  return (
    <div className="playlist-track-route">
      <div className="pl-track-title">{playlistParam}</div>

      {dataTable.length < 1 ? <div className="pl-empty">This playlist is Empty</div> : ''}

      <div className="pl-track-content">
        {dataTable.map((data, i) => (
          <MusicBlock
            musicDataTable={dataTable}
            data={data}
            key={i}
            displayArtistImage={true}
            isInCustomPlaylist={isInCustomPlaylist}
            playlistParam={playlistParam}
          />
        ))}
      </div>
    </div>
  )
}

export default PlaylistTrack;