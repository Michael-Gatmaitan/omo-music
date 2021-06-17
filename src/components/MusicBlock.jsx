import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { EventContext } from '../context/EventContext';

const MusicBlock = props => {
  const { data, musicDataTable, displayArtistImage } = props;
  const { functionsToFire } = useContext(AudioContext);

  const {
    setShowMusicOptions,
    setMusicOptionsData
  } = useContext(EventContext);

  const musicTitle = data.slice(data.indexOf(" - ") + 3, -4);
  const musicArtist = data.slice(0, data.indexOf(" - "));
  const customPath = musicArtist.replaceAll(" ", "-").toLowerCase();
  
  return (
    <div
      className={
        `${ displayArtistImage ? 'music-block' :'music-block music-block-no-artist-image' }`
      }

      onClick={
        e => {
          if (e.target.className.includes("options")) {
            setShowMusicOptions(true);
            setMusicOptionsData(data, musicTitle, musicArtist);
          } else {
            functionsToFire(data, musicDataTable);
          }
        }
      }
    >
      <div className="music-artist-image"
        style={{
          display: displayArtistImage ? 'block' : 'none'
        }}
      >
        <img src={`../artists-image/${customPath}.jpg`} alt="" />
      </div>
      
      <div className="music-info">
        <div className="music-title">
          {musicTitle}
        </div>
        <div className="music-artist">
          {musicArtist}
        </div>
      </div>

      <div className="music-options-parent">
        <div className="music-options-button">
          <img src="../svg/floating-icons/more.svg" className="options" alt="" />
        </div>
      </div>
    </div>
  )
}

export default MusicBlock;