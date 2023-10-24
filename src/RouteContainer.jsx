import React, { Suspense, lazy } from "react";
import {
  Switch,
  Route,
  // useHistory,
  useLocation,
} from "react-router-dom";

// Components
import AppBody from "./AppBody";
import FloatingMusicTrack from "./components/FloatingMusicTrack";
import ArtistTrack from "./components/pages/artists/artistTrack/ArtistTrack";
// import PlaylistTrack from './components/PlaylistTrack';
import { PageFallback } from "./components/_FallbackComponents";
import "./components/scss/RouteContainer.css";

// Route Components
const Musics = lazy(() => import("./components/pages/musics/Musics"));
const Artists = lazy(() => import("./components/pages/artists/Artists"));
const Playlists = lazy(() => import("./components/pages/playlists/Playlists"));
const Search = lazy(() => import("./components/pages/search/Search"));
const PlaylistTrack = lazy(() => import("./components/pages/playlists/PlaylistTrack"));

const About = lazy(() => import("./components/pages/about/About"));
const Contact = lazy(() => import("./components/pages/contact/Contact"));
const OmoMusic = lazy(() => import("./components/pages/omo-music/OmoMusic"));

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

  const { pathname } = useLocation();

  return (
    <div className='route-container'>
      <div className='route-grid-container'>
        <div className='route-grid-wrap'>
          {/* Routes inside AppBody */}
          {pathname !== "/search" && <AppBody />}

          <div className='main-routes-container'>
            <Switch>
              <Route exact path='/'>
                <Suspense fallback={<PageFallback />}>
                  <Musics />
                </Suspense>
              </Route>
              <Route exact path='/playlists'>
                <Suspense fallback={<PageFallback />}>
                  <Playlists />
                </Suspense>
              </Route>
              <Route exact path='/artists'>
                <Suspense fallback={<PageFallback />}>
                  <Artists />
                </Suspense>
              </Route>

              <Route exact path='/about'>
                <Suspense fallback={<PageFallback />}>
                  <About />
                </Suspense>
              </Route>

              <Route exact path='/contact'>
                <Suspense fallback={<PageFallback />}>
                  <Contact />
                </Suspense>
              </Route>

              <Route exact path='/omo-music'>
                <Suspense fallback={<PageFallback />}>
                  <OmoMusic />
                </Suspense>
              </Route>

              {/* nested routes */}
              <Route path='/artists/:artistID'>
                <ArtistTrack />
              </Route>

              {/* Routers for "Playlists" */}
              {/*
               ** Favorites
               ** Made For You
               ** Custom Playlists
               */}

              <Route path='/playlists/:playlistID'>
                <Suspense fallback={<PageFallback />}>
                  <PlaylistTrack />
                </Suspense>
              </Route>

              <Route exact path='/search'>
                <Suspense fallback={<PageFallback />}>
                  <Search />
                </Suspense>
              </Route>

              <Route path='*'>
                <div className='404'>Page not found!</div>
              </Route>
            </Switch>
          </div>
        </div>

        <FloatingMusicTrack />
      </div>
    </div>
  );
};

export default RouteContainer;
