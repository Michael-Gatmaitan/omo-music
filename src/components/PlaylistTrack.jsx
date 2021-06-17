import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';
import { playlists } from '../dataSource'; 

import MusicBlock from './MusicBlock';

const PlaylistTrack = () => {
  const { favorites } = useContext(AudioContext);
  const { playlistID: playlistParam } = useParams();

  let [dataTable, setDataTable] = useState([]);
  useEffect(() => {
    if (playlistParam === "Favorites") {
      setDataTable(favorites);
    } else {
      let searchedPlaylist = playlists.filter(e => e.playlistName === playlistParam)[0];
      
      // If user select a playlist that he created, statement below will fire.
      if (searchedPlaylist === undefined) {
        const createdPlaylist = JSON.parse(localStorage.getItem("yourPlaylists"));
        searchedPlaylist = createdPlaylist.filter(e => e.playlistName === playlistParam)[0];
      }

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
          />
        ))}
      </div>
    </div>
  )
}

export default PlaylistTrack;