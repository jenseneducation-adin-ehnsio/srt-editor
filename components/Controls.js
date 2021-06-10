
export default function Controls({isPlaying, video, prevSub, nextSub, playPause, mirrorTime, handleSliderChange}) {

  return (
    <div className="edit_controls">
      <div className="play_pause">
        <img onClick={prevSub} src="/chevron-left.svg" alt="prev"/>
        {!isPlaying ? (
          <img onClick={playPause} src="/play.svg" alt="play"/>
        ) : (
          <img onClick={playPause} src="/pause.svg" alt="pause"/>
        )}
        <img onClick={nextSub} src="/chevron-right.svg" alt="next"/>
      </div>
      <input type="range" min="0" max={video.current.duration || "100"} value={mirrorTime || 0}
      onChange={(e) => handleSliderChange(e)} step="0.1"/>
    </div>
  )
}