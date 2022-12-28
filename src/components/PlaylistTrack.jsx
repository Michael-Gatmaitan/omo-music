// @ts-nocheck
import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';
import { Link } from 'react-router-dom';
// import { EventContext } from '../context/EventContext';
import { playlists } from '../dataSource';
import { MusicBlockFallback } from './_FallbackComponents';

const MusicBlock = lazy(() => import('./MusicBlock'));

const PlaylistTrack = () => {

  const { favorites, yourPlaylists } = useContext(AudioContext);
  // const { setMusicOptionsData } = useContext(EventContext);
  let [dataTable, setDataTable] = useState([]);
  let [isInCustomPlaylist, setIsInCustomPlaylist] = useState(false);
  let [mentionedArtist, setMentionedArtist] = useState([]);

  const { playlistID: playlistParam } = useParams();

  // Checking if the
  // current page is a custom created playlist
  useEffect(() => {
    let yourPlaylistsTemp = [...yourPlaylists];

    for (let i of yourPlaylistsTemp) {
      if (playlistParam === i.playlistName) {
        setIsInCustomPlaylist(true);
        break;
      }
    }
    // eslint-disable-next-line
  }, [yourPlaylists]);

  /* If the current page is "favorites"
     We will get the dataTable in states
     of AudioContext */
  useEffect(() => {
    if (playlistParam === "Favorites") {
      setDataTable(favorites);
    } else {
      // The data will be searched in made_for_you playlists except in "Favorites";
      let searchedPlaylist =
        playlists.find(e => e.playlistName === playlistParam) ||
        JSON.parse(localStorage.getItem("yourPlaylists"))
          .find(e => e.playlistName === playlistParam) ||
        (function() {
          console.error("Playlist cannot found.");
          return new Error("Playlist didn't found.");
        })();
      setDataTable(searchedPlaylist.musics);
    }
    // eslint-disable-next-line
  }, [yourPlaylists]);

  // Setting mentioned Artists
  useEffect(() => {
    let mentionedAritstList = [];

    dataTable.forEach(data => {
      let artist = data.slice(0, data.indexOf(" - "));
      
      if (!mentionedAritstList.includes(artist))
        mentionedAritstList.push(artist);
    });
    
    setMentionedArtist(mentionedAritstList.sort());
  }, [dataTable]);

  return (
    <div className="playlist-track-route">
      <div className="pl-track-title">{playlistParam}</div>

      {dataTable.length < 1 ?
        <div className="pl-empty">This playlist is Empty</div>
      :
        <React.Fragment>
          <div className="mentioned-artists">
            <div className="mentioned-artists-wrapper">
              {mentionedArtist.map((artist, i) => {
                let artistFilteredName = artist.toLowerCase().replaceAll(" ", "-");
                let artistLink = `/artists/${artistFilteredName}`;
                
                return (
                  <Link to={artistLink} key={i}>
                    <div className="artist">

                      <div className="mentioned-artist-image">
                        <img src={`../artists-image/${artistFilteredName}.jpg`} alt="" />
                      </div>

                      {artist}

                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pl-track-content">
            {dataTable.map((data, i) => (
              <Suspense key={i} fallback={<MusicBlockFallback />}>
                <MusicBlock
                  musicDataTable={dataTable}
                  data={data}
                  displayArtistImage={true}
                  isInCustomPlaylist={isInCustomPlaylist}
                  playlistParam={playlistParam}
                />
              </Suspense>
            ))}
          </div>
        </React.Fragment>
      }
    </div>
  )
}

export default PlaylistTrack;