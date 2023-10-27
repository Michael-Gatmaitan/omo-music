interface MusicLocalStorageType {
  showBackArrow: boolean,
  // currentPage: string | "Musics" | "About" | "Playlists" | "Artists",
  currentPage: string,

    activeMusicRawTitle: string,
    activeMusic: string,

    currentTime: number,
    duration: number,

    order: boolean,
    shuffle: boolean,

    playing: boolean,

    musicLoading: boolean,

    trackList: string[],

    trackHistoryIndex: number | null,
    trackHistory: string[],

    recentPlayed: string[],

    favorites: string[],

    yourPlaylists: PlaylistType,

    activeMusicInfo: MusicInfoType,
}

interface PlaylistType {
  playlistID: number,
  playlistName: string,
  musics: string[],
  imageLink: string
}

interface MusicInfoType {
  path: string,
  title: string,
  artistName: string,
}