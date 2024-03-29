import './scss/FallbackComponents.css';



export const MusicBlockFallback = () => {

  return (
    <div className="musicblock-fallback">
      <div className="shadows">
        <div className="title-shadow"></div>
        <div className="artist-shadow"></div>
      </div>
    </div>
  )
};

export const PageFallback = () => {
  return (
    <div className="page-fallback">
      <div className="loading-container">
        <img src={`/svg/omo-logo.svg`} alt="Logo" />
        <div className="loading-label">
          Loading, please wait.
        </div>
      </div>
    </div>
  )
}