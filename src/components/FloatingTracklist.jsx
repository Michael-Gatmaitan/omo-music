import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { EventContext } from '../context/EventContext';

import './scss/FloatingTracklist.css';

const FloatingTracklist = props => {

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
  // const {
  //   showTracklist,
  //   setShowTracklist,
  // } = props;

  return (
    <div className="floating-tracklist"
      style={{
        opacity: showTracklist ? 1 : 0,
        pointerEvents: showTracklist ? 'auto' : 'none',
        transform: `translateY(${showTracklist ? '0' : '20px'})`
      }}
    >

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

        <div className="close-tracklist close-modal"
          onClick={ _ => setShowTracklist(false) }
        >
          Close
        </div>

      </div>

    </div>
  )
}

export default FloatingTracklist;