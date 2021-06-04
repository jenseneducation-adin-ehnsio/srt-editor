/* eslint-disable jsx-a11y/media-has-caption */
import Head from 'next/head';
import { useState, useEffect } from 'react';
import parser from 'subtitles-parser';
import { useContext } from 'react';
import Store from '../components/Store';

export default function Home() {
  const [srt, setSrt] = useState();
  const { saveSrtObject } = useContext(Store);

  useEffect(() => {
    if (srt) {
      const reader = new FileReader();
      reader.onload = function (e) {
        let subs = e.target.result;
        let parsedSubs = parser.fromSrt(subs);
        saveSrtObject(parsedSubs);
      };
      reader.readAsText(srt);
    }
  }, [srt]);

  return (
    <div className="app">
      <Head>
        <title>SRT Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <label htmlFor="upload">
          <img src="/blob.svg" alt="blob" />
          <input
            id="upload"
            accept=".srt"
            type="file"
            onChange={(e) => setSrt(e.target.files?.item(0))}
          />
          <h3>Add SRT</h3>
        </label>
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
            img {
              width: 100vw;
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
