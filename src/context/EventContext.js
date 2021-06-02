import { Component, createContext } from 'react';

export const EventContext = createContext();

export default class EventContextProvider extends Component {

  state = {
    showTracklist: false,
  }

  setShowTracklist = bool => this.setState({ showTracklist: bool });

  render() {

    const events_states = {
      setShowTracklist: this.setShowTracklist,
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