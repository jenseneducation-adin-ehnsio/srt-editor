import { useEffect, useState, memo } from 'react';

const Video = ({ video, videoSrc, searchSrt }) => {
const [type, setType] = useState();

  useEffect(() => {
    if (videoSrc) {
      if (videoSrc.type === 'video/webm') {
        setType('webm');
      } else {
        setType('mp4');
      }
    }
  }, [videoSrc]);

  return(
    <div className="edit_video">
      <div id="subtitles" className="edit_video__subtitles"></div>
      <video
        onTimeUpdate={(e) => searchSrt(e.target.currentTime)}
        ref={video}
        src={URL.createObjectURL(videoSrc)}>
        <source src={URL.createObjectURL(videoSrc)} type={`video/${type}`}></source>
      </video>
    </div>
  )
}

export default memo(Video, (prevProps, nextProps) => prevProps.videoSrc === nextProps.videoSrc);