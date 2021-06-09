
export default function Controls({isPlaying, video, prevSub, nextSub, playPause, parseSrt, mirrorTime, handleSliderChange}) {

  return (
    <div className="controls">
      <div className="play_pause">
        <p onClick={prevSub}>prev</p>
        {!isPlaying ? (
          <p onClick={playPause}>play</p>
        ) : (
          <p onClick={playPause}>pause</p>
        )}
        <p onClick={nextSub}>next</p>
      </div>
      <button onClick={parseSrt}>download</button>
      <input type="range" min="0" max={video.current.duration || "100"} value={mirrorTime}
      onChange={(e) => handleSliderChange(e)} step="0.1"/>
    <style jsx scoped>{`
    .controls {
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 10px;
      background-color: white;
      .play_pause {
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }
    }
    `}</style>
    </div>
  )
}