import { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';

const MusicBlock = props => {
  const { data, musicDataTable } = props;
  let { functionsToFire } = useContext(AudioContext);

  const musicArtist = data.slice(0, data.indexOf(" - "));
  const customPath = musicArtist.replaceAll(" ", "-").toLowerCase();

  return (
    <div
      className="music-block"
      onClick={() => functionsToFire(data, musicDataTable)}
    >
      <div className="music-artist-image">
        <img src={`../artists-image/${customPath}.jpg`} alt="artist-image_music-block" />
      </div>
      
      <div className="music-info">
        <div className="music-title">
          {data.slice(data.indexOf(" - ") + 3, -4)}
        </div>
        <div className="music-artist">
          {musicArtist}
        </div>
      </div>
    </div>
  )
}

export default MusicBlock;