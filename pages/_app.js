import '../styles/global.scss';
import React from 'react';
import Store from '../components/Store';
import Router from 'next/router';
import { useEffect, useState } from 'react';


export default function App(props) {

  const [srtObject, setSrtObject] = useState([]);

  useEffect(() => {
    const srtJson = localStorage.getItem('srt');
    const srt = JSON.parse(srtJson);
    console.log(srt);

    if (srt) {
      setSrtObject(srt);
    }
  }, []);

  const saveSrtObject = (srt) => {
    const srtJson = JSON.stringify(srt);
    localStorage.setItem('srt', srtJson);

    setSrtObject(srt);

    Router.push('/edit');
  }

  const updateSrtObject = (texts, id) => {
    let srtText = formatToSrt(texts);
    let newArray = [...srtObject];
    let index = srtObject.findIndex(s => s.id === id);
    newArray[index].text = srtText;
    setSrtObject(newArray);
  }

  const formatToSrt = (texts) => {
    let newFormat = texts.map((text, index) => {
      if(index === 0) {
        return `<i>${text}</i>`
      } else {
        return `\n<i>${text}</i>`
      }
    })
    return newFormat.join('');
  }

  const { Component, pageProps } = props;

    return (
      <Store.Provider value={{ srtObject: srtObject, saveSrtObject: saveSrtObject, updateSrtObject: updateSrtObject }}>
        <Component {...pageProps} />
      </Store.Provider>
    );
}