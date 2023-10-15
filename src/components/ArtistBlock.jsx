import {
  Link
} from "react-router-dom";
import './scss/ArtistBlock.css';

const ArtistBlock = ({ data }) => (
  <div
    className="artist-block"
    style={{
      backgroundImage: `url("/artists-image/${data.path}.jpg")`
    }}
  >
    <Link to={`artists/${data.path}`}>
      <div className="dark-fade" />

      <div className="artist-info">
        <div className="artist-name-blck">
          {data.artistName}
        </div>
        <div className="artist-songs-length">
          {data.musics.length} Songs
        </div>
      </div>
    </Link>
  </div>
);

export default ArtistBlock;