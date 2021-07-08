import {
  Switch,
  Route,
  // useHistory,
  // useLocation
} from "react-router-dom";

// Components
import ArtistTrack from './components/ArtistTrack';
import Musics from './components/Musics';
import Artists from './components/Artists';
import AppBody from './AppBody';
import Playlists from './components/Playlists';
import FloatingMusicTrack from './components/FloatingMusicTrack';

import PlaylistTrack from './components/PlaylistTrack';

import './components/scss/RouteContainer.css';

const RouteContainer = () => {

  // const history = useHistory();
  // const location = useLocation();

  // useEffect(() => {
  //   return history.listen(loc => {
  //     if (history.location === "POP") {
  //       history.go(1);
  //     }
  //   });
  // }, [])

  return (
    <div className="route-container">

      <div className="route-grid-container">

        <div className="route-grid-wrap">

          {/* Routes inside AppBody */}
          <AppBody />

          <div id="main-routes-container" style={{ paddingTop: "12px" }}>
            <Switch>
              <Route exact path="/">
                <Musics />
              </Route>
              <Route exact path="/playlists">
                <Playlists />
              </Route>
              <Route exact path="/artists">
                <Artists />
              </Route>

              {/* nested routes */}
              <Route path="/artists/:artistID">
                <ArtistTrack />
              </Route>

              {/* Routers for "Playlists" */}
              {/* 
                  ** Favorites
                  ** Made For You
                  ** Custom Playlists
              */}

              <Route path="/playlists/:playlistID">
                <PlaylistTrack />
              </Route>
            </Switch>
          </div>
        </div>

        <FloatingMusicTrack />
        
      </div>

    </div>
  )
}

export default RouteContainer;