import { playlists } from '../dataSource';

const Playlists = () => {
  return (
    <>
      {playlists.map(pl => (
        <PlaylistBlock pl={pl} key={pl.playlistID} />
      ))}
    </>
  );
}

const PlaylistBlock = ({ pl }) => {
  return (
    <div className="pl">{pl.playlistName}</div>
  )
}

export default Playlists;