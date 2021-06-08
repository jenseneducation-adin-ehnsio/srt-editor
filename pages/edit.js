import Head from 'next/head';
import { useState, useRef, useContext, useEffect } from 'react';
import Store from '../components/Store';
import SubList from '../components/SubList';
import Video from '../components/Video';
import parser from 'subtitles-parser';

export default function Edit() {
  const [videoSrc, setVideo] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [mirrorTime, setMirrorTime] = useState();
  const { srtObject, setCurrentId, currentId } = useContext(Store);
  const video = useRef(null);

  useEffect(() => {
    if(video.current) {
      if(isPlaying) {
        video.current.play();
      } else {
        video.current.pause()
      }
    }
  }, [isPlaying]);

  const searchSrt = (time) => {
    if(!time) {
      time = video.current.currentTime;
    }
    setMirrorTime(time);
    const subtitles = document.getElementById('subtitles');
    let found = srtObject.find((srt) => {
      return time >= calcTime(srt.startTime, -0.8) && time <= calcTime(srt.endTime, 0);
    });
    if (!found && subtitles.innerHTML !== '<i></i>') {
      subtitles.innerHTML = null;
      subtitles.insertAdjacentHTML('beforeend', '<i></i>');
    } else if (found && subtitles.innerHTML !== found.text) {
      setCurrentId(found.id);
      subtitles.innerHTML = null;
      subtitles.insertAdjacentHTML('beforeend', found.text);
    }
    if(!found) {
      setCurrentId(null);
    }
  };

  const downloadSrt = (data, name) => {
    let file = new Blob([data], { type: 'text/html' });
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file, name);
    } else {
      var a = document.createElement('a'),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  const parseSrt = () => {
    let backToSrt = parser.toSrt(srtObject);
    downloadSrt(backToSrt, 'test.srt');
  };

  const playPause = () => {
    if(!isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const onPlay = (time) => {
    setIsPlaying(true);
    const offset = 0;
    videoJump(time, offset);
  }

  const onEdit = (time) => {
    setIsPlaying(false);
    const offset = 0.5;
    videoJump(time, offset);
  }

  const videoJump = (time, offset) => {
    if(video.current) {
      let totalTime = calcTime(time, offset);
      video.current.currentTime = totalTime;
    }
  };

  const nextSub = () => {
    let current = parseInt(currentId) + 1;
    let next = srtObject.find((s) => {
      return parseInt(s.id) === current
    })
    if(next) {
      videoJump(next.startTime, 0);
    } else {
      videoJump(srtObject[0].startTime, 0);
    }
  }

  const prevSub = () => {
    let current = parseInt(currentId) - 1;
    let prev = srtObject.find((s) => {
      return parseInt(s.id) === current
    })
    if(next) {
      videoJump(prev.startTime, 0);
    } else {
      videoJump(srtObject[0].startTime, 0);
    }
  }

  const handleSliderChange = (e) => {
    video.current.currentTime = e.target.value;
  }

  const calcTime = (time, offset) => {
    let timeArray = time.split(':');
    let h = parseInt(timeArray[0]);
    let m = parseInt(timeArray[1]);
    let s = parseFloat(timeArray[2].replace(',', '.')) + offset;
    return h * 3600 + m * 60 + s;
  };

  return (
    <div className="app">
      <Head>
        <title>SRT Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {videoSrc ? (
          <Video video={video} searchSrt={searchSrt} videoSrc={videoSrc}/>
        ) : (
          <label htmlFor="upload">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#D0E2FF"
                d="M51.2,-67.8C63.2,-61.7,67.7,-42.6,70.7,-25C73.7,-7.3,75.3,8.8,71.4,23.9C67.5,39,58.1,53.1,45.3,63.3C32.5,73.5,16.3,79.8,2.8,76C-10.7,72.1,-21.4,58.2,-34.4,48C-47.3,37.9,-62.5,31.6,-69.7,20.1C-76.9,8.7,-76.2,-7.9,-68.7,-19.6C-61.1,-31.3,-46.9,-38.1,-34.3,-44C-21.7,-49.8,-10.9,-54.8,4.4,-60.8C19.6,-66.8,39.2,-73.8,51.2,-67.8Z"
                transform="translate(100 100)"
              />
            </svg>
            <input
              id="upload"
              accept="video/*"
              type="file"
              onChange={(e) => setVideo(e.target.files?.item(0))}
            />
            <h3>Add Video +</h3>
          </label>
        )}
        {srtObject && (
          <SubList srtObject={srtObject} searchSrt={searchSrt} onPlay={onPlay} onEdit={onEdit} video={video} /> 
        )}
        {video.current && (
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
            <input 
            type="range"
            min="0" max={video.current.duration || "100"}
            value={mirrorTime}
            onChange={(e) => handleSliderChange(e)}
            step="0.1"/>
          </div>
        )}
      </main>

      <style jsx scoped>{`
        main {
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
            input {
              width: 100%;
            }
          }
          label {
            position: relative;
            svg {
              width: 100%;
            }
            input {
              display: none;
            }
            h3 {
              position: absolute;
              margin: 0;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
              white-space: nowrap;
            }
          }
        }
      `}</style>
    </div>
  );
}
