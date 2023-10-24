import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import ArtistBlock from '../artists/ArtistBlock';
import { SearchContext } from '../../../context/SearchContext';
import { MusicBlockFallback } from '../../_FallbackComponents';
import '../../scss/Search.css';

const MusicBlock = lazy(() => import("../../MusicBlock"));

const Search = () => {

  const {
    searchValue,
    musicsResults,
    artistsResults,
    emptyResults,
    isResultEmpty
  } = useContext(SearchContext);

  useEffect(() => emptyResults(), [emptyResults]);

  const [showMusics, setShowMusics] = useState(true);
  const [showArtists, setShowArtists] = useState(true);

  return (
    <div className="search-route">

      <div className="search-filters">
        <div
          className={`songs ${showMusics && "active-filt"}`}
          onClick={() => setShowMusics(!showMusics)}
        >
          Songs
        </div>
        <div
          className={`artists ${showArtists && "active-filt"}`}
          onClick={() => setShowArtists(!showArtists)}
        >
          Artists
        </div>
      </div>

      {/* Searchbar is empty */}
      {(searchValue === "" && !isResultEmpty) &&
        <div className="search-something">Search something...</div>
      }

      {/* No results */}
      {isResultEmpty ?
        <div className="no-results">No results for "{searchValue}"</div> :
        searchValue !== "" ? <div className="results-for">Results for "{searchValue}"</div> :
        ""
      }

      {/* Display results */}
      {showMusics && musicsResults.length !== 0 &&
        <MusicsResultsComponent musicsResults={musicsResults} />
      }


      {showArtists && artistsResults.length !== 0 &&
        <ArtistsResultsComponent artistsResults={artistsResults} />
      }
      
    </div>
  )
}

const MusicsResultsComponent = ({ musicsResults }) => (
  <div className="musics-results">
    <div className="search-header-text">Musics</div>
    {musicsResults.map((result, i) => (
        <Suspense fallback={<MusicBlockFallback />} key={i}>
          <MusicBlock
            musicDataTable={musicsResults}
            data={result}
            displayArtistImage={true}
          />
        </Suspense>
      )
    )}
  </div>
);

const ArtistsResultsComponent = ({ artistsResults }) => (
  <div className="artists-results">
    <div className="search-header-text">Related Artists</div>
    <div className="artists-results-grid">
      {artistsResults.map(result => (
        <ArtistBlock data={result} key={result.artistID} />
      ))}
    </div>
  </div>
);

export default Search;