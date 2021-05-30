/* eslint-disable jsx-a11y/media-has-caption */
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import Store from '../components/Store';
import parser from 'subtitles-parser';

export default function Edit() {
  const [videoSrc, setVideo] = useState();
  const [from, setFrom] = useState();
  const { srtObject } = useContext(Store);
  const video = useRef({
    currentTime: 0
  });

  useEffect(() => {
    if (videoSrc) {
      if (videoSrc.type === 'video/webm') {
        setFrom('webm');
      } else {
        setFrom('mp4');
      }
    }
  }, [videoSrc]);

  // useEffect(() => {
  //   if (video.current) {
  //     console.log(video.current.currentTime);
  //   }
  // }, [video.current.currentTime]);

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
    // console.log(video.current.currentTime);
  };

  return (
    <div className="app">
      <Head>
        <title>SRT Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {videoSrc && (
          <video ref={video} controls src={URL.createObjectURL(videoSrc)}>
            <source src={URL.createObjectURL(videoSrc)} type={`video/${from}`}></source>
          </video>
        )}
        {!videoSrc && (
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
        <button onClick={parseSrt}>download</button>
      </main>

      <style jsx scoped>{`
        main {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          flex-direction: column;
          padding: 10px;
          input {
            width: 200px;
          }
          video {
            width: 100%;
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
