import { Component, createContext } from "react";
import { allMusics, bodyData } from "../dataSource";
export const SearchContext = createContext();

export default class SearchContextProvider extends Component {
  state = {
    searchValue: "",
    musicsResults: [],
    artistsResults: [],
    typing: false,
    typingTimeout: 0,

    isResultEmpty: false,

    relatedArtist: [],
  };

  emptyResults = () => {
    this.setState({ musicsResults: [] });
    this.setState({ artistsResults: [] });
  };

  performSearch = (inpVal) => {
    inpVal = inpVal.trim();
    this.setState({ searchValue: inpVal });
    if (inpVal === "" || inpVal <= 2) {
      this.emptyResults();
      this.setState({ isResultEmpty: false });
      clearTimeout(this.state.typingTimeout);
      return;
    }

    if (this.state.typingTimeout) clearTimeout(this.state.typingTimeout);

    // Function that fire after 1s of not typing
    const typingStoppedCallback = () => {
      console.log("User stopped typing, search performing...");
      let inpValLowerCase = inpVal.toLowerCase();

      const start = Date.now();
      // Search for Musics
      const searchedMusics = allMusics.filter((data) =>
        data.toLowerCase().slice(0, -4).includes(inpValLowerCase)
      );
      this.setState({ musicsResults: searchedMusics });

      // Search for Artists
      let searchedArtists = bodyData.filter((data) =>
        data.artistName.toLowerCase().includes(inpValLowerCase)
      );
      this.setState({ artistsResults: searchedArtists });

      if (searchedArtists.length === 0) {
        for (let i = 0; i < searchedMusics.length; i++) {
          let relatedArtist = searchedMusics[i].slice(
            0,
            searchedMusics[i].indexOf("-") - 1
          );

          for (let j = 0; j < bodyData.length; j++) {
            if (bodyData[j].artistName === relatedArtist) {
              if (searchedArtists.includes(bodyData[j])) continue;
              searchedArtists.push(bodyData[j]);
            }
          }
        }
        this.setState({ artistsResults: searchedArtists });
      }

      const end = Date.now();
      const diff = end - start;
      console.log(
        `Search timing - Start: ${start}ms, End: ${end}ms, Duration: ${diff}ms`
      );

      // Results isn't empty
      const isResultsEmpty =
        searchedMusics.length === 0 && searchedArtists.length === 0;
      this.setState({ isResultsEmpty });

      // Set related artist if there is no artist fetched at song search : Sa susunod nalang haha
    };

    this.setState({
      typingTimeout: setTimeout(typingStoppedCallback, 1000),
    });
  };

  render() {
    const searchEvents = {
      emptyResults: this.emptyResults,
      performSearch: this.performSearch,
    };

    return (
      <SearchContext.Provider
        value={{
          ...this.state,
          ...searchEvents,
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}
