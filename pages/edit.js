import Head from 'next/head';
import { useState, useRef, useContext, useEffect } from 'react';
import Store from '../components/Store';
import SubList from '../components/SubList';
import Video from '../components/Video';
import Controls from '../components/Controls';
import parser from 'subtitles-parser';
import PrimaryButton from '../components/PrimaryButton'

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
    if (subtitles && !found && subtitles.innerHTML !== '<i></i>') {
      subtitles.innerHTML = null;
      subtitles.insertAdjacentHTML('beforeend', '<i></i>');
    } else if (subtitles && found && subtitles.innerHTML !== found.text) {
      subtitles.innerHTML = null;
      subtitles.insertAdjacentHTML('beforeend', found.text);
    }
    if(!found && subtitles) {
      setCurrentId(null);
    } else {
      setCurrentId(found.id);
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

  const onEdit = (time) => {
    setIsPlaying(false);
    const offset = 0.5;
    videoJump(time, offset);
  }

  const videoJump = (time, offset) => {
    if(video.current) {
      let totalTime = calcTime(time, offset);
      video.current.currentTime = totalTime;
    } else {
      searchSrt(calcTime(time, 0));
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

      <main className="edit">
        <img onClick={parseSrt} className="edit_download" alt="download" src="/download-cloud.svg" />
        {videoSrc ? (
          <Video video={video} searchSrt={searchSrt} videoSrc={videoSrc}/>
        ) : (
          <label className="edit_add-video" htmlFor="upload">
            <PrimaryButton title={'Lägg till film'} />
            <input
              id="upload"
              accept="video/*"
              type="file"
              onChange={(e) => setVideo(e.target.files?.item(0))}
            />
          </label>
        )}
        {srtObject && (
          <SubList srtObject={srtObject} videoSrc={videoSrc} searchSrt={searchSrt} videoJump={videoJump} onEdit={onEdit} video={video} /> 
        )}
        {video.current && (
          <Controls isPlaying={isPlaying} prevSub={prevSub} playPause={playPause} nextSub={nextSub} video={video} mirrorTime={mirrorTime} handleSliderChange={handleSliderChange} />
        )}
      </main>
    </div>
  );
}
