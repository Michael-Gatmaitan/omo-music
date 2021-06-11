import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import { bodyData } from '../dataSource';
import MusicBlock from './MusicBlock';
import './scss/ArtistTrack.css';

const ArtistTrack = () => {

  const { artistID } = useParams();
  let [artistData, setArtistData] = useState({
    path: '',
    artistName: '',
    musics: [],
    artistID: Number
  });

  let [musicDataTable, setMusicDataTable] = useState([]);
  
  useEffect(() => {

    let dataFilt = bodyData.filter(o => o.path === artistID)[0];
    setArtistData(dataFilt);
    setMusicDataTable(dataFilt.musics);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { path, artistName, musics } = artistData;

  return (
    <div className="artist-track-route">
      <div className="artist-track-info">
        <div className="artist-image-wrapper">
          <img src={`../artists-image/${path}.jpg`} alt="" />
        </div>
        <div className="artist-name">
          {artistName}
        </div>
        <div className="artist-music-length">
          {musics.length} {musics.length > 1 ? 'Songs' : 'Song'}
        </div>

      </div>
      <div className="music-grid">
        {musicDataTable.map((data, i) => (
          <MusicBlock
            musicDataTable={musicDataTable}
            data={data}
            key={i}
            displayArtistImage={true}
          />
        ))}
      </div>
    </div>
  )
}

export default ArtistTrack; 
