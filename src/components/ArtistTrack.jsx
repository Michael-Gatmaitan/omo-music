import React, { useEffect, useState, useContext } from 'react'; 
import { useParams } from 'react-router-dom';
import { bodyData } from '../dataSource';
import MusicBlock from './MusicBlock';
import './scss/ArtistTrack.css';

const ArtistTrack = () => {

  const params = useParams();
  const { artistID } = params;
  let [data, setData] = useState({
    path: '',
    artistName: '',
    musics: [],
    artistID: Number
  });
  let [musicDataTable, setMusicDataTable] = useState([]);
  
  useEffect(() => {
    let dataFilt = bodyData.filter(o => o.path === artistID)[0];
    setData(dataFilt);
    setMusicDataTable(dataFilt.musics);
  }, []);

  return (
    <div className="artist-track-route">
      <div className="artist-track-info">
        <div className="artist-image-wrapper">
          <img src={`../artists-image/${data.path}.jpg`} alt={data.path} />
        </div>
        <div className="artist-name">
          {data.artistName}
        </div>
        <div className="artist-music-length">
          {data.musics.length} Songs
        </div>

      </div>
      <div className="music-grid">
        {musicDataTable.map((data, i) => (
          <MusicBlock
            musicDataTable={musicDataTable}
            data={data}
            key={i}
          />
        ))}
      </div>
    </div>
  )
}

export default ArtistTrack; 
