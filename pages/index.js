/* eslint-disable jsx-a11y/media-has-caption */
import Head from 'next/head';
import { useState, useEffect } from 'react';
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
// const ffmpeg = createFFmpeg({ log: true });

export default function Home() {
  const [ready, setReady] = useState(true);
  const [video, setVideo] = useState();
  const [from, setFrom] = useState();
  // const [to, setTo] = useState();
  // const [altSource, setSource] = useState();

  // const load = async () => {
  //   await ffmpeg.load();
  //   setReady(true);
  // };

  // useEffect(() => {
  //   load();
  // }, []);

  useEffect(() => {
    if (video) {
      if (video.type === 'video/webm') {
        setFrom('webm');
        // setTo('mp4');
      } else {
        setFrom('mp4');
        // setTo('webm');
      }
    }
  }, [video]);

  // useEffect(() => {
  //   if (to) {
  //     convert();
  //   }
  // }, [to]);

  // const convert = async () => {
  //   //Writing file to memory
  //   ffmpeg.FS('writeFile', `video.${from}`, await fetchFile(video));

  //   //Convert to webm
  //   await ffmpeg.run('-i', `video.${from}`, '-f', to, `out.${to}`);

  //   //Read file
  //   const data = ffmpeg.FS('readFile', `out.${to}`);

  //   //Create a URL
  //   const url = URL.createObjectURL(new Blob([data.buffer], { type: `video/${to}` }));

  //   //SetSources
  //   setSource(url);
  // };

  return ready ? (
    <div className="app">
      <Head>
        <title>SRT Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {video && (
          <video controls src={URL.createObjectURL(video)}>
            <source src={URL.createObjectURL(video)} type={`video/${from}`}></source>
            {/* {altSource && <source src={altSource} type={`video/${to}`}></source>} */}
          </video>
        )}
        {!video && (
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
      </main>

      <style jsx>{`
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
  ) : (
    <p>loading</p>
  );
}
