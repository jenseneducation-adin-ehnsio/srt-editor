/* eslint-disable jsx-a11y/media-has-caption */
import Head from 'next/head';
import { useState, useEffect } from 'react';
import parser from 'subtitles-parser';
import { useContext } from 'react';
import Store from '../components/Store';
import PrimaryButton from '../components/PrimaryButton'

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

      <main className="index">
        <div className="index_hero">
          <h1>Redigera dina undertexter online</h1>
        </div>
        <label className="index_label" htmlFor="upload">
          <PrimaryButton title={'Välj textfil'} />
          <input
            id="upload"
            accept=".srt"
            type="file"
            onChange={(e) => setSrt(e.target.files?.item(0))}
          />
        </label>
        <div className="index_illustration">
          <img src="/images/edit.png" alt="illustration" />
        </div>
        <div className="index_trust">
          <ul>
            <li><img src="/check.svg" alt="check.svg"/><h3>Helt kostnadsfritt</h3></li>
            <li><img src="/check.svg" alt="check.svg"/><h3>Enkelt verktyg</h3></li>
          </ul>
        </div>
      </main>
    </div>
  );
}
