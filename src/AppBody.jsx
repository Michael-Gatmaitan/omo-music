import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AudioContext } from './context/AudioContext';

const AppBody = () => {

  let {
    showBackArrow,
    currentPage,
    setCurrentPage
  } = useContext(AudioContext);

  let history = useHistory();

  let routes = [
    { routeName: 'Musics', url: '/', id: 0 },
    { routeName: 'Playlists', url: '/playlists', id: 1 },
    { routeName: 'Artists', url: '/artists', id: 2 },
  ];

  let routeButtons;

  const handleSetPage = (page, id) => {
    routeButtons = [...document.getElementsByClassName("route-button")];
    setCurrentPage(page);

    routeButtons.map((e, i) => {
      if (id === i)
        e.classList.add("active-route");
      else
        e.classList.remove("active-route");
      return
    });
  }

  return (
    <div className="app-body">
    
    <div className="location-title">
      <div className="back-arrow"
        onClick={ () => history.goBack() }
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
      {routes.map(e => (
        <Link
          onClick={ () => handleSetPage(e.routeName, e.id) }
          key={e.id}
          to={e.url}
          className={`route-button ${e.id === 0 ? "active-route" : ""}`}
        >
          <li>
              {e.routeName}
          </li>
        </Link>
      ))}
    </ul>
  </div>
  )
}

export default AppBody;