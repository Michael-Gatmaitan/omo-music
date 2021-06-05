import { Component, createContext } from 'react';

export const EventContext = createContext();

export default class EventContextProvider extends Component {

  state = {
    showTracklist: false,

    showMusicOptions: false,

    showMusicTrackMobile: false,
  }

  setShowTracklist = bool => this.setState({ showTracklist: bool });

  setShowMusicOptions = bool => this.setState({ showMusicOptions: bool });

  setShowMusicTrackMobile = bool => this.setState({ showMusicTrackMobile: bool });
  render() {

    const events_states = {
      setShowTracklist: this.setShowTracklist,
      setShowMusicOptions: this.setShowMusicOptions,
      setShowMusicTrackMobile: this.setShowMusicTrackMobile,
    };

    return (
      <EventContext.Provider
				value={
					{
						...this.state,
						...events_states
					}
				}
			>
				{this.props.children}
			</EventContext.Provider>
    )
  }
}