import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';
import { EventContext } from '../context/EventContext';
import { SearchContext } from '../context/SearchContext';
import './scss/MusicBlock.css';

const MusicBlock = props => {
  const history = useHistory();

  const {
    data,
    musicDataTable,
    displayArtistImage,
    isInCustomPlaylist,
    playlistParam
  } = props;

  const {
    functionsToFire,
    removeMusicInPlaylist,
    activeMusicInfo
  } = useContext(AudioContext);

  const {
    setShowMusicOptions,
    setMusicOptionsData,
    setShowMusicTrackMobile
  } = useContext(EventContext);

  const { musicsResults } = useContext(SearchContext);

  let [isActiveMusic, setIsActiveMusic] = useState(false);

  useEffect(() => {
    const { title, artistName } = activeMusicInfo;
    setIsActiveMusic(data === `${artistName} - ${title}.mp3`);
    // eslint-disable-next-line
  }, [activeMusicInfo, musicsResults]);

  const musicTitle = data.slice(data.indexOf(" - ") + 3, -4);
  const musicArtist = data.slice(0, data.indexOf(" - "));
  const customPath = musicArtist.replaceAll(" ", "-").toLowerCase();
  
  const mbClassIsActiveMusic = isActiveMusic ? 'active-music' : "";
  const mbClassHasImage = displayArtistImage ? "" : 'music-block-no-artist-image';
  const mbClassHasRemove = isInCustomPlaylist ? 'removable-music-block' : "";


  const handleOptionsEvent = e => {
    e.stopPropagation();
    setShowMusicOptions(true);
    setMusicOptionsData(data, musicTitle, musicArtist);
  }

  const handleRemoveEvent = e => {
    e.stopPropagation();
    removeMusicInPlaylist(playlistParam, data);
    /* Direct to previous section when
       some music deleted in playlist */
    history.goBack();
  }

  const handleMusicEvent = e => isActiveMusic ? setShowMusicTrackMobile(true) : functionsToFire(data, musicDataTable);

  let musicArtistImageStyle = {
    display: displayArtistImage ? 'block' : 'none'
  }

  return (
    <div
      className={`music-block ${mbClassIsActiveMusic} ${mbClassHasImage} ${mbClassHasRemove}`}
      onClick={ handleMusicEvent }
    >
      <div className="music-artist-image"
        style={ musicArtistImageStyle }
      >
        <img src={`../artists-image/${customPath}.jpg`} alt="" />
      </div>
      
      <div className="music-info">
        <div className="music-title">{musicTitle}</div>

        <div className="music-artist">{musicArtist}</div>
      </div>

      {isInCustomPlaylist ?
      <div className="remove" onClick={ handleRemoveEvent }></div>
      : ""}

      <div className="music-options-parent" onClick={ handleOptionsEvent }>
        <div className="music-options-button">
          <img src="../svg/floating-icons/more.svg" className="options" alt="" />
        </div>
      </div>
    </div>
  )
}

export default MusicBlock;