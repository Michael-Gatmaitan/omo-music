import {
  Switch,
  Route
} from "react-router-dom";

// Components
import ArtistTrack from './components/ArtistTrack';
import Musics from './components/Musics';
import Artists from './components/Artists';
import AppBody from './AppBody.jsx';
import Playlists from './components/Playlists';
import FloatingMusicTrack from './components/FloatingMusicTrack.jsx';
import MoreMusicOptions from "./components/MoreMusicOptions";

import './components/scss/RouteContainer.css';

const RouteContainer = () => {

  return (
    <div className="route-container">

      <div className="route-grid-container">

        <div className="route-grid-wrap">

          <AppBody />

          <Switch>
            <Route exact path="/">
              <Musics />
            </Route>
            <Route path="/playlists">
              <Playlists />
            </Route>
            <Route exact path="/artists">
              <Artists />
            </Route>

            {/* nested routes */}
            <Route path="/artists/:artistID">
              <ArtistTrack />
            </Route>
          </Switch>
        </div>

        <FloatingMusicTrack />
        <MoreMusicOptions />

      </div>

    </div>
  )
}

export default RouteContainer;