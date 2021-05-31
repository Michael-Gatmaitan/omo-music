import { useContext, useEffect } from 'react';
import { AudioContext } from '../context/AudioContext';
import './scss/FloatingTracklist.css';

const FloatingTracklist = props => {

  const audioContext = useContext(AudioContext);
  const {
    showTracklist,
    setShowTracklist
  } = props;

  const {
    trackList
  } = audioContext;

  useEffect(() => {
    console.log(trackList);
  }, []);

  return (
    <div className="floating-tracklist"
      style={{
        opacity: showTracklist ? 1 : 0,
        pointerEvents: showTracklist ? 'auto' : 'none',
        transform: `translateY(${showTracklist ? '0' : '20px'})`
      }}
    >

      <div className="tracklist-container">

        <div className="tracklist-head">Tracklist</div>

        <div className="tracklist-content-parent">
          <div className="tracklist-content">

            {trackList.map((e, i) => (
              <div className="tracklist-music-block"
                key={i}
              >
                Hotdog #{i}
              </div>
            ))}

          </div>
        </div>

        <div className="close-tracklist"
          onClick={ _ => setShowTracklist(false) }
        >
          Close
        </div>

      </div>

    </div>
  )
}

export default FloatingTracklist;