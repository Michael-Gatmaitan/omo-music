import {
  Link
} from "react-router-dom";

const ArtistBlock = props => {
  const { data } = props;

  return (
    <div
      className="artist-block"
      style={{
        backgroundImage: `url('../artists-image/${data.path}.jpg')`
      }}
    >
      <div className="event-emitter" />

      <div className="dark-fade" />

      <div className="artist-info">
        <Link to={`artists/${data.path}`}>
          <div className="artist-name-blck">
            {data.artistName}
          </div>
          <div className="artist-songs-length">{data.musics.length} Songs</div>
        </Link>
      </div>
    </div>
  )
}

export default ArtistBlock;