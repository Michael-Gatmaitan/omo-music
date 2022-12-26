import { Component, createContext } from 'react';
import { allMusics, bodyData } from '../dataSource';
export const SearchContext = createContext();

export default class SearchContextProvider extends Component {

  state = {
    searchValue: "",
    musicsResults: [],
    artistsResults: [],
    typing: false,
    typingTimeout: 0,

    isResultEmpty: false,

    relatedArtist: []
  };

  emptyResults = () => {
    this.setState({ musicsResults: [] });
    this.setState({ artistsResults: [] });
  }

  performSearch = inpVal => {
    inpVal = inpVal.trim();
    this.setState({ searchValue: inpVal });
    if (inpVal === "" || inpVal <= 2) {
      this.emptyResults();
      this.setState({ isResultEmpty: false });
      clearTimeout(this.state.typingTimeout);
      return;
    }

    if(this.state.typingTimeout) clearTimeout(this.state.typingTimeout);

    this.setState({
      typingTimeout: setTimeout(() => {
        console.log("User stopped typing, search performing...");
        let inpValLowerCase = inpVal.toLowerCase();
        // Search for Musics
        const m = allMusics.filter(data => data.toLowerCase().slice(0, -4).includes(inpValLowerCase) === true);
        this.setState({ musicsResults: m });

        // Search for Artists
        let a = bodyData.filter(data => data.artistName.toLowerCase().includes(inpValLowerCase));
        this.setState({ artistsResults: a });

        if (a.length === 0) {
          for (let i = 0; i < m.length; i++) {
            let relatedArtist = m[i].slice(0, m[i].indexOf("-") - 1);
            for (let j = 0; j < bodyData.length; j++) {
              if (bodyData[j].artistName === relatedArtist) {
                a.push(bodyData[j]);
              }
            }
          }
          this.setState({ artistsResults: a });
        }


        // Results isn't empty
        if (m.length === 0 && a.length === 0) {
          this.setState({ isResultEmpty: true });
        } else {
          this.setState({ isResultEmpty: false });
        }

        // Set related artist if there is no artist fetched at song search
      }, 1000)
    });

  }

  render() {

    const searchEvents = {
      emptyResults: this.emptyResults,
      performSearch: this.performSearch
    };

    return (
      <SearchContext.Provider
        value={{
          ...this.state,
          ...searchEvents
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    )
  }
}