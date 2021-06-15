import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';
import { playlists } from '../dataSource'; 

import MusicBlock from './MusicBlock';

const PlaylistTrack = () => {
  const { favorites } = useContext(AudioContext);
  const { playlistID } = useParams();

  let [dataTable, setDataTable] = useState([]);
  useEffect(() => {
    if (playlistID === "Favorites") {
      setDataTable(favorites);
    } else {
      const searchedPlaylist = playlists.filter(e => e.playlistName === playlistID)[0];
      setDataTable(searchedPlaylist.musics);
    }
  }, []);

  return (
    <div className="playlist-track-route">
      <div className="pl-track-title">{playlistID}</div>

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