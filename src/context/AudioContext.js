import { Component, createContext } from 'react';

export const AudioContext = createContext();

export default class AudioContextProvider extends Component {
	
	state = JSON.parse(localStorage.getItem("bodyState")) || {
		showBackArrow: false,
		currentPage: 'Musics',

		activeMusicRawTitle: '',
		activeMusic: '',

		currentTime: 0,
		duration: 0,
		currentDurPercent: 0,
		
		order: false,
		shuffle: true,

		playing: false,

		musicLoading: false,

		trackList: [],

		trackHistoryIndex: null,
		trackHistory: [],

		recentPlayed: [],

		favorites: [],

		activeMusicInfo: {
			path: '',
			title: '',
			artistName: ''
		}
	};

	componentDidMount() {
		if (localStorage.getItem("bodyState") !== null) {
			let audioEl = document.getElementsByTagName("audio")[0];
			audioEl.load();
		}
	}

	componentDidUpdate() {
		localStorage.setItem("bodyState", JSON.stringify(this.state));
	}

	updateFavorites = item => {
		let favoritesTemp = [...this.state.favorites];

		if (favoritesTemp.includes(item)) {
			favoritesTemp.splice(favoritesTemp.indexOf(item), 1);
		} else {
			favoritesTemp.unshift(item);
		}

		// Callback used for debugging purpose only
		this.setState({ favorites: favoritesTemp }, () => {
			console.log(this.state.favorites);
		});
	}

	triggerMusicLoading = bool => this.setState({ musicLoading: bool });

	triggerShowBackArrow = bool => this.setState({ showBackArrow: bool });

	setCurrentPage = title => this.setState({ currentPage: title });

	triggerPlaying = bool => this.setState({ playing: bool });

	prev = () => {
		let { trackHistoryIndex, trackHistory } = this.state;
		trackHistoryIndex -= 1;
		this.setState({ trackHistoryIndex });

		let stepBack = trackHistory[trackHistoryIndex];
		this.musicSelectedFromLoc(stepBack);
	}
	
	next = () => this.musicSelectedFromLoc(this.handleMusicEnded());

	// Functions compiled
	functionsToFire = (data, dataTable) => {
		this.musicSelectedFromLoc(data);
		this.updateTrackList(dataTable);
		this.updateTrackHistory(data);
	}

	updateRecentPlayed = newItem => {
		let recentPlayed = [...this.state.recentPlayed];
		recentPlayed.unshift(newItem);
		this.setState({ recentPlayed });
	}

	updateTrackHistory = track => {
		let trackHistory = [...this.state.trackHistory];
		
		if (!(track === trackHistory[trackHistory.length - 1])) {

			// Moving played song to the bottom if
			// it exist on trackHistory
			trackHistory = trackHistory.includes(track)
			? trackHistory.filter(history => history !== track)
			: trackHistory;

			// Removing first element when length
			// of trackList reaches 100
			if (trackHistory.length >= 100)
				trackHistory.shift();
			
			trackHistory.push(track);
			this.setState({ trackHistory });
		}

		this.updateRecentPlayed(track);
		
		let trackHistoryIndex = trackHistory.lastIndexOf(track);
		this.setState({ trackHistoryIndex });
	}

	updateTrackLoc = loc => this.setState({ trackLoc: loc });

	musicSelectedFromLoc = mscName => {
		const musicArtist = mscName.slice(0, mscName.indexOf(" - "));
		const customPath = musicArtist.replaceAll(" ", "-").toLowerCase();
		const music = `../music-data/${customPath}/${mscName}`;

		const musicInfo = {
			path: customPath,
			title: mscName.slice(mscName.indexOf(" - ") + 3, -4),
			artistName: musicArtist
		}

		document.title = mscName.slice(0, -4);

		this.handleChangeMusic(mscName, music, musicInfo);
	}
	
	handleChangeMusic = (mscName, activeMusic, activeMusicInfo) => {
		this.setState({ activeMusicRawTitle: mscName });
		this.setState({ activeMusic });
		this.setState({ activeMusicInfo });
	}

	updateTrackList = trackList => this.setState({ trackList });

	updateCurrentTime = currentTime => {
		this.setState({ currentDurPercent: (
			this.state.currentTime / this.state.duration) * 100
		});
		this.setState({ currentTime });
	}
	updateTotalDuration = duration => this.setState({ duration });

	handleMusicEnded = () => {
		// Next song state will be option here
		const { activeMusicRawTitle, trackList } = this.state;
		const { order, shuffle } = this.state;
		let { trackHistoryIndex, trackHistory } = this.state;

		let nextSong;
		
		const currentMusicIndex = trackList.lastIndexOf(activeMusicRawTitle);

		if (trackHistoryIndex === trackHistory.length - 1) {
			if (order) {
				nextSong = currentMusicIndex === trackList.length - 1 ?
				trackList[0] : trackList[currentMusicIndex + 1];
			} else if (shuffle) {
				do {
					nextSong = trackList[Math.floor(Math.random() * trackList.length)];
				} while (trackList.indexOf(nextSong) === currentMusicIndex);
			}
		} else {
			trackHistoryIndex += 1;
			this.setState({ trackHistoryIndex });
			nextSong = trackHistory[trackHistoryIndex];
		}

		if (!(trackHistoryIndex !== trackHistory.length - 1)) {
			this.updateTrackHistory(nextSong);
		}
		return nextSong;
	}
 
	changeMusicEndState = () => {
		this.setState({ order: !this.state.order });
		this.setState({ shuffle: !this.state.shuffle });
	}

	// Music Blocks Option's Function
	addQueue = music => {
		let trackListTemp = [...this.state.trackList];
		trackListTemp.push(music);
		
		this.setState({ trackList: trackListTemp });
	}

	render() {
		
		const events_states = {
			triggerPlaying: this.triggerPlaying,

			...{
				// currentTime: this.state.currentTime,
				// duration: this.state.duration,
				// currentDurPercent: this.state.currentDurPercent,
			},

			...{
				updateTotalDuration: this.updateTotalDuration,
				updateCurrentTime: this.updateCurrentTime,
			},

			...{
				handleChangeMusic: this.handleChangeMusic,
				handleMusicEnded: this.handleMusicEnded,
				changeMusicEndState: this.changeMusicEndState,
				updateTrackLoc: this.updateTrackLoc,
			},

			...{
				musicSelectedFromLoc: this.musicSelectedFromLoc,
				updateTrackList: this.updateTrackList,
				updateTrackHistory: this.updateTrackHistory,
			},

			functionsToFire: this.functionsToFire,

			...{
				// trackHistory: this.state.trackHistory,
				// trackHistoryIndex: this.state.trackHistoryIndex,
			},

			// activeMusic: this.state.activeMusic,

			...{
				prev: this.prev,
				next: this.next,
			},

			...{
				// order: this.state.order,
				// shuffle: this.state.shuffle,
			},
			
			...{
				triggerShowBackArrow: this.triggerShowBackArrow,
				// showBackArrow: this.state.showBackArrow
			},

			...{
				// currentPage: this.state.currentPage,
				setCurrentPage: this.setCurrentPage
			},

			// activeMusicInfo: this.state.activeMusicInfo,
			
			...{
				// musicLoading: this.state.musicLoading,
				triggerMusicLoading: this.triggerMusicLoading
			},

			// trackList: this.state.trackList,
			
			...{
				// favorites: this.state.favorites,
				updateFavorites: this.updateFavorites
			},
			
		};

		return (
			<AudioContext.Provider
				value={
					{
						...this.state,
						...events_states
					}
				}
			>
				{this.props.children}
			</AudioContext.Provider>
		)
	}
}