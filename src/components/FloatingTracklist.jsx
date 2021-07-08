import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { EventContext } from '../context/EventContext';

import CloseButton from './buttons/CloseButton';

import './scss/FloatingTracklist.css';

const FloatingTracklist = () => {

  const audioContext = useContext(AudioContext);
  const {
    trackList,
    functionsToFire
  } = audioContext;

  const eventContext = useContext(EventContext);
  const {
    showTracklist,
    setShowTracklist
  } = eventContext;

  const floatingTracklilstStyle = {
    opacity: showTracklist ? 1 : 0,
    pointerEvents: showTracklist ? 'auto' : 'none',
    transform: `translateY(${showTracklist ? '0' : '20px'})`
  };

  return (
    <div className="floating-tracklist" style={floatingTracklilstStyle}>
      <div className="tracklist-container">

        <div className="tracklist-head">Tracklist ({trackList.length})</div>

        <div className="tracklist-content-parent">
          <div className="tracklist-content">

            {trackList.map((e, i) => (
              <div className="tracklist-music-block"
                key={i}
                onClick={ () => functionsToFire(e, trackList) }
              >
                
                <div className="tl-music-info">
                  <div className="tl-title">{e.slice(e.indexOf(" - ") + 3, -4)}</div>
                  <div className="tl-artist">{e.slice(0, e.indexOf(" - "))}</div>
                </div>
          
                <div className="tl-liner" />
          
              </div>
            ))}

          </div>
        </div>

        <CloseButton closeFunction={ setShowTracklist } />

      </div>
    </div>
  )
}

export default FloatingTracklist;