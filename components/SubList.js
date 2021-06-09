import EditText from '../components/EditText'
import Store from '../components/Store';
import { useContext, useRef, useEffect, useState } from 'react';

export default function SubList({videoJump, searchSrt, video, onEdit, videoSrc}) {
  const { srtObject } = useContext(Store);
  const { currentId } = useContext(Store);
  let [height, setHeight]= useState(null)
  const list = useRef(null);

  useEffect(() => {
    handleHeight()
    window.addEventListener("resize", handleHeight);
    return () => window.removeEventListener("resize", handleHeight);
  }, [])

  useEffect(() => {
    handleHeight();
  }, [videoSrc])

  const handleHeight = () => {
    setTimeout(() => {
      setHeight(window.innerHeight - list.current.offsetTop - 50);
    }, 200);
  }

  return (
    <ul style={{height: `${height}px`}} ref={list} className="edit_list">
      {srtObject.map((sub) => (
        <li onClick={() => videoJump(sub.startTime, 0)} key={sub.id} className={sub.id === currentId ? 'edit_list__active' : null}>
          <p>Från: {sub.startTime}</p>
          <p>Till: {sub.endTime}</p>
          <EditText searchSrt={searchSrt} sub={sub} onEdit={onEdit} video={video} />
        </li>
      ))}
    </ul>
  )
}