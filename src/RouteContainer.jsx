import React, { Suspense } from 'react';
import {
  Switch,
  Route,
  // useHistory,
  useLocation
} from "react-router-dom";

// Components
import AppBody from './AppBody';
import FloatingMusicTrack from './components/FloatingMusicTrack';
import ArtistTrack from './components/ArtistTrack';
import PlaylistTrack from './components/PlaylistTrack';
import './components/scss/RouteContainer.css';

// Route Components
const Musics = React.lazy(() => import('./components/Musics'));
const Artists = React.lazy(() => import('./components/Artists'));
const Playlists = React.lazy(() => import('./components/Playlists'));
const Search = React.lazy(() => import('./components/Search'));

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

  const {pathname} = useLocation();

  return (
    <div className="route-container">

      <div className="route-grid-container">

        <div className="route-grid-wrap">

          {/* Routes inside AppBody */}
          { pathname !== "/search" && <AppBody /> }

          <div className="main-routes-container">
            <Switch>
              <Route exact path="/">
                <Suspense fallback={<div>Page loading</div>}>
                  <Musics />
                </Suspense>
              </Route>
              <Route exact path="/playlists">
                <Suspense fallback={<div>Page loading</div>}>
                  <Playlists />
                </Suspense>
              </Route>
              <Route exact path="/artists">
                <Suspense fallback={<div>Page loading</div>}>
                  <Artists />
                </Suspense>
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

              <Route exact path="/search">
                <Suspense fallback={<div>Page loading</div>}>
                  <Search />
                </Suspense>
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