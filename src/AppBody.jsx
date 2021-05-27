import { useContext } from 'react';
import {
  Link,
  useHistory
} from 'react-router-dom';
import { AudioContext } from './context/AudioContext';

const AppBody = () => {

  let {
    showBackArrow,
    currentPage,
    setCurrentPage
  } = useContext(AudioContext);
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
      >{currentPage}</span>
    </div>
    <ul className="route-links">
      <li onClick={ () => setCurrentPage("Musics") }>
        <Link to="/">Musics</Link>
      </li>
      <li onClick={ () => setCurrentPage("Playlists") }>
        <Link to="/playlists">Playlists</Link>
      </li> 
      <li onClick={ () => setCurrentPage("Artists") }>
        <Link to="/artists">Artists</Link>
      </li>
    </ul>
  </div>
  )
}

export default AppBody;