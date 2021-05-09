
import React, { useEffect, useRef, useContext } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useLocation } from 'react-router-dom';

// Components
import MusicTrackBar from './components/MusicTrackBar';

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
    showBackArrow,
    triggerShowBackArrow
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
    let { pathname } = location;
    console.log(location);
    let slashCount = countSlashURL(pathname);
    if (slashCount > 1) {
      triggerShowBackArrow(true);
    } else {
      triggerShowBackArrow(false);
    }

  }, [location]);

  return (
    <>
      <ReactAudioPlayer
        src={ activeMusic }
        autoPlay
        ref={ e => aud = e }
        listenInterval={1500}
        onLoadedMetadata={() => updateTotalDuration(aud.audioEl.current.duration)}
        onListen={() => updateCurrentTime(aud.audioEl.current.currentTime)}
        onEnded={ next }

        onPlay={ () => triggerPlaying(true) }
        onPause={ () => triggerPlaying(false) }
      />

      <Nav />

      <RouteContainer />

      <MusicTrackBar />
    </>
  )
}

export default App;
