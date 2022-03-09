// @ts-nocheck

import { useEffect, useRef, useContext } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useLocation } from 'react-router-dom';

// Components
import MusicTrackBar from './components/MusicTrackBar';
import MusicTrackMobile from './components/modal-box/MusicTrackMobile';
import MusicOptions from './components/modal-box/MusicOptions';
import CreatePlaylist from './components/modal-box/CreatePlaylist';
import PlaylistOptions from './components/modal-box/PlaylistOptions';
import Sidebar from './components/Sidebar';

// Contexts 
import { AudioContext } from './context/AudioContext';
// import { EventContext } from './context/EventContext';

// Routes
import Nav from './components/Nav';
import RouteContainer from './RouteContainer.jsx';

function App() {
  const audioContext = useContext(AudioContext);
  const {
    // States need to update
    activeMusic,
    updateTotalDuration,
    updateCurrentTime,
    
    triggerPlaying,
    // Used for shuffling || ordering music onEnd.
    next,
    triggerShowBackArrow,

    setCurrentPage,

    // TODO,
    // musicLoading,
    triggerMusicLoading
  } = audioContext;

  let aud = useRef(null);

  // Basically loads audioEl after changing SRC
  useEffect(() => {
    if (activeMusic !== '') {
      aud.audioEl.current.load(); 
    }

    triggerMusicLoading(true);
    // eslint-disable-next-line
  }, [activeMusic]);

  let location = useLocation();

  function countSlashURL(url) {
    let count = 0;
    let slash = "/";

    for (let i = 0; i < url.length; i += 1) {
      if (url[i] === slash)
        count += 1
    }
    return count;
  }

  useEffect(() => {
    let { pathname } = location;
    triggerShowBackArrow(countSlashURL(pathname) > 1);

    setCurrentPage(
      pathname.length === 1 ? "Musics" :
      pathname.includes("playlists") ? "Playlists" :
      pathname.includes("artists") ? "Artists" : ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <ReactAudioPlayer
        src={ activeMusic }
        autoPlay
        ref={ e => aud = e }
        listenInterval={1000}
        onCanPlay={ _ => {
          updateTotalDuration(aud.audioEl.current.duration);
          triggerMusicLoading(false);
        }}
        onListen={ e => updateCurrentTime(e) }
        onEnded={ next }

        onPlay={ _ => triggerPlaying(true) }
        onPause={ _ => triggerPlaying(false) }
      />

      <Nav />

      <MusicTrackMobile />

      <RouteContainer />

      <MusicTrackBar />

      <MusicOptions />

      <CreatePlaylist />

      <PlaylistOptions />

      <Sidebar />
    </>
  )
}

export default App;
