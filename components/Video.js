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
    <div className="video_wrapper">
      <div id="subtitles" className="subtitles"></div>
      <video
        controls
        onTimeUpdate={(e) => searchSrt(e.target.currentTime)}
        ref={video}
        src={URL.createObjectURL(videoSrc)}>
        <source src={URL.createObjectURL(videoSrc)} type={`video/${type}`}></source>
      </video>
    <style jsx scoped>{`
    .video_wrapper {
      width: 100%;
      position: relative;
      video {
        width: 100%;
      }
      .subtitles {
        position: absolute;
        bottom: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        i {
          color: yellow;
        }
      }
    }
    `}</style>
    </div>
  )
}

export default memo(Video, (prevProps, nextProps) => prevProps.videoSrc === nextProps.videoSrc);