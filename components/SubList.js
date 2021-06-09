import EditText from '../components/EditText'
import Store from '../components/Store';
import { useContext, useRef, useEffect, useState } from 'react';

export default function SubList({onPlay, searchSrt, video, onEdit, videoSrc}) {
  const { srtObject } = useContext(Store);
  const { currentId } = useContext(Store);
  let [height, setHeight]= useState(null)
  const list = useRef(null);

  useEffect(() => {
    setHeight(window.innerHeight - list.current.offsetTop - 50);
  }, [])

  useEffect(() => {
    console.log('hejhej')
    setHeight(window.innerHeight - list.current.offsetTop - 50);
  }, [videoSrc])

  return (
    <ul style={{height: `${height}px`}} ref={list} className="srt_list">
      {srtObject.map((sub) => (
        <li key={sub.id} className={sub.id === currentId ? 'active' : null}>
          <EditText searchSrt={searchSrt} sub={sub} onEdit={onEdit} video={video} />
          <button onClick={() => onPlay(sub.startTime)}>
            {sub.id}: {sub.startTime}
          </button>
        </li>
      ))}
    <style jsx scoped>{`
    .srt_list {
      width: 100%;
      overflow-y: scroll;
      padding-bottom: 100px;
      .srt_container {
        display: flex;
        flex-direction: column;
      }
      .active {
        border: 1px solid blue;
      }
    }
    `}</style>
    </ul>
  )
}