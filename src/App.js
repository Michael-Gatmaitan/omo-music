
import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useLocation } from 'react-router-dom';

// Components
import MusicTrackBar from './components/MusicTrackBar';
import MusicTrackMobile from './components/MusicTrackMobile';

// Contexts 
import { AudioContext } from './context/AudioContext';

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

    setCurrentPage
  } = audioContext;

  let aud = useRef(null);

  // Basically loads audioEl after changing SRC
  useEffect(() => {
    if (activeMusic !== '') {
      aud.audioEl.current.load(); 
    }
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
    let { pathname } = location

    let slashCount = countSlashURL(pathname);
    if (slashCount > 1) {
      triggerShowBackArrow(true);
    } else {
      triggerShowBackArrow(false);
    }

    setCurrentPage(
      pathname.length === 1 ? "Musics" :
      pathname.includes("playlists") ? "Playlists" :
      pathname.includes("artists") ? "Artists" : ""
    )
  }, [location]);

  // State for MusicTrackMobile

  let [isTrackOpen, setIsTrackOpen] = useState(false);

  return (
    <>
      <ReactAudioPlayer
        src={ activeMusic }
        autoPlay
        ref={ e => aud = e }
        listenInterval={1000}
        onLoadedMetadata={ _ => updateTotalDuration(aud.audioEl.current.duration) }
        onListen={ e => updateCurrentTime(e) }
        onEnded={ next }

        onPlay={ _ => triggerPlaying(true) }
        onPause={ _ => triggerPlaying(false) }
      />

      <Nav />

      <MusicTrackMobile
        isTrackOpen={isTrackOpen}
        setIsTrackOpen={setIsTrackOpen}
      />

      <RouteContainer />

      <MusicTrackBar
        setIsTrackOpen={setIsTrackOpen}
      />
    </>
  )
}

export default App;
