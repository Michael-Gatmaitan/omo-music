import { useContext } from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom';
import { AudioContext } from './context/AudioContext';

const AppBody = () => {

  let { showBackArrow } = useContext(AudioContext);
  let history = useHistory();

  return (
    <div className="app-body">
    
    <div className="location-title">
      <div className="back-arrow"
        onClick={() => history.goBack() }
        style={{
          opacity: showBackArrow ? 1 : 0,
          pointerEvents: showBackArrow ? 'auto' : 'none'
        }}
      >
        <img src="../svg/back-arrow.svg" alt="back-arrow" />
      </div>

      <span
        style={{
          marginLeft: showBackArrow ? '46px' : '0px'
        }}
      >Musics</span>
    </div>
    <ul className="route-links">
      <li>
        <Link to="/">Musics</Link>
      </li>
      <li>
        <Link to="/playlists">Playlists</Link>
      </li> 
      <li>
        <Link to="/artists">Artists</Link>
      </li>
    </ul>
  </div>
  )
}

export default AppBody;