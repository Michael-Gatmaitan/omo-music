import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';

const MusicBlock = props => {
  const { data, musicDataTable, displayArtistImage } = props;
  let { functionsToFire } = useContext(AudioContext);

  const musicArtist = data.slice(0, data.indexOf(" - "));
  const customPath = musicArtist.replaceAll(" ", "-").toLowerCase();

  return (
    <div
      className={
        `${
          displayArtistImage ? 'music-block'
          :'music-block music-block-no-artist-image'
        }`
      }

      onClick={
        e => {
          // functionsToFire(data, musicDataTable);

          // if (e.target.className.includes("options")) {
          //   // Show options here
          // } else {
          //   functionsToFire(data, musicDataTable);
          // }

          if (e.target.className.includes("options")) {
            // Show options here
            // Options' content => /**
              // Add to Favourites
              // Add to playing Queue
              // Add to Playlist
              // View Artist
            // */
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
          {data.slice(data.indexOf(" - ") + 3, -4)}
        </div>
        <div className="music-artist">
          {musicArtist}
        </div>
      </div>

      <div className="music-options">
        <div className="music-options-button">
          <img src="../svg/floating-icons/more.svg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default MusicBlock;