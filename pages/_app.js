import '../styles/global.scss';
import React from 'react';
import App from 'next/app';
import Store from '../components/Store';
import Router from 'next/router';

export default class MyApp extends App {
  state = {
    srtObject: null
  };

  componentDidMount = () => {
    const srtJson = localStorage.getItem('srt');
    const srt = JSON.parse(srtJson);
    console.log(srt)

    if (srt) {
      this.setState({
        srtObject: srt
      });
    }
  };

  setSrtObject = (srt) => {
    const srtJson = JSON.stringify(srt);
    localStorage.setItem('srt', srtJson);

    this.setState({
      srtObject: srt
    });

    Router.push('/edit');
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Store.Provider value={{ srtObject: this.state.srtObject, setSrtObject: this.setSrtObject }}>
        <Component {...pageProps} />
      </Store.Provider>
    );
  }
}