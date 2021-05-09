import React from 'react';
import {
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import './scss/Artists.css';
// import { AudioContext } from '../context/AudioContext';
import { bodyData } from '../dataSource';

const Artists = props => {
  const match = useRouteMatch();
  
  // <Link to={`${match.url}/${data.path}`}>{data.artistName}</Link>
  // {bodyData.map(data => (
  //   <li key={data.artistID}>
  //     <Link to={`${match.url}/${data.path}`}>{data.artistName}</Link>
  //   </li>
  // ))}
  return (
    <div className="artists-route">
      {bodyData.map(data => (
        <div className="artist-block" key={data.artistID}
          onClick={() => console.log("Clicked")}
          style={{
            backgroundImage: `url('../artists-image/${data.path}.jpg')`
          }}
        >
          <div className="event-emitter" />

          <div className="dark-fade" />

          <div className="artist-info">
            <Link to={`${match.url}/${data.path}`}>
              <div className="artist-name-blck">
                {data.artistName}
              </div>
              <div className="artist-songs-length">{data.musics.length} Songs</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Artists;
