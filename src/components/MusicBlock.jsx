import { useContext, useEffect, useState } from 'react';
import { AudioContext } from '../context/AudioContext';
import { EventContext } from '../context/EventContext';
import { SearchContext } from '../context/SearchContext';
import './scss/MusicBlock.css';

const MusicBlock = props => {
  const {
    data,
    musicDataTable,
    displayArtistImage,
    isInCustomPlaylist,
    playlistParam
  } = props;

  const {
    activeMusic,
    onMusicSelect,
    removeMusicInPlaylist,
    activeMusicInfo,
    albumCoverChecker
  } = useContext(AudioContext);

  const {
    setShowMusicOptions,
    setMusicOptionsData,
    setShowMusicTrackMobile
  } = useContext(EventContext);

  const { musicsResults } = useContext(SearchContext);

  let [isActiveMusic, setIsActiveMusic] = useState(false);

  useEffect(() => {
    setIsActiveMusic(data === activeMusic);
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
  }

  const handleMusicEvent = e => isActiveMusic ? setShowMusicTrackMobile(true) : onMusicSelect(data, musicDataTable);

  let musicArtistImageStyle = {
    display: displayArtistImage ? 'block' : 'none'
  }

  // Checking for available albumCovers
  const cover_artistName = musicArtist.replaceAll(" ", "-").toLowerCase();
  const cover_musicTitle = data;
  
  let [cover_fileName, set_cover_fileName] = useState(undefined);

  useEffect(() => {
    set_cover_fileName(albumCoverChecker(cover_artistName, cover_musicTitle));
  }, [albumCoverChecker, cover_artistName, cover_musicTitle]);

  return (
    <div
      className={`music-block ${mbClassIsActiveMusic} ${mbClassHasImage} ${mbClassHasRemove}`}
      onClick={ handleMusicEvent }
    >
      <div className="music-artist-image"
        style={ musicArtistImageStyle }
      >
        <img src={
          cover_fileName !== undefined ?
            `../album-covers/${cover_artistName}/${cover_fileName}` :
            `../artists-image/${customPath}.jpg`
        } alt="" />
      </div>
      
      <div className="music-info">
        <div className="music-title">{musicTitle}</div>

        <div className="music-artist">{musicArtist}</div>
      </div>

      {isInCustomPlaylist ?
      <div className="remove" onClick={ handleRemoveEvent }>
        <div className="remove-icon" />
      </div>
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