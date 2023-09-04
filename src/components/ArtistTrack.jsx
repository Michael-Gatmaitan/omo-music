import React, { useEffect, useState } from 'react'; 
import { useParams, useLocation } from 'react-router-dom';
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
  
  // State for url checking, if valid, continue. if not, display custom 404
  let [isURLValid, setIsURLValid] = useState(true);

  useEffect(() => {

    let dataFilt = bodyData.filter(o => o.path === artistID)[0];

    
    // Set inline 404 component to prevent firing the code bellow
    if (dataFilt) {
      // Cancelling of changing route
      setArtistData(dataFilt);
      setMusicDataTable(dataFilt.musics);
    } else {
      setIsURLValid(false);
    }
    
  }, [artistID]);

  const { path, artistName, musics } = artistData;

  return (
    <>
    {isURLValid ?
      <div className="artist-track-route">
        <div className="artist-track-info">
          <div className="artist-image-wrapper">
            <img src={`/artists-image/${path}.jpg`} alt={path} />
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
      </div> : <InvalidArtist />
    }
    </>
  )
}

const InvalidArtist = () => {
  const { pathname } = useLocation();

  return (
    <div className="artist-not-found">
      <div className="not-found_header">Artist not found.</div>
      <code>{pathname}</code> is not available.
    </div>
  )
}

export default ArtistTrack; 
