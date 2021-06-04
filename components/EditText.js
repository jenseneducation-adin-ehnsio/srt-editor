import { useState, useEffect, useContext } from 'react';
import Store from '../components/Store';
import Video from './Video';

export default function EditText({sub, searchSrt, onPlay, video}) {
  const [edit, setEdit] = useState(false);
  const [texts, setTexts] = useState();
  const { updateSrtObject } = useContext(Store);

  useEffect(() => {
    let srtArray = (sub.text.split('</i>'))
    srtArray.pop();
    let filtered = srtArray.map((srt) => {
      return srt.replace(/<i>|\n/g, '')
    })
    setTexts(filtered);
  }, []);

  const updateText = async (str, index) => {
    let newArr = [...texts];
    newArr[index] = str;
    setTexts(newArr);
    await updateSrtObject(newArr, sub.id);
    searchSrt()
  }

  const toggleEdit = () => {
    setEdit(!edit);
    video.current.pause();
    onPlay(sub.startTime);
  }

  return (
    <div>
          {!edit ? (
            <div className="srt_container" dangerouslySetInnerHTML={{ __html: sub.text }}></div>
          ) : (
            texts.map((text, i) => (
              <input key={i} type="text" value={text} onChange={e => updateText(e.target.value, i)} />
            ))
          )}
          <button onClick={() => toggleEdit()}>toggle</button>
    <style jsx scoped>{`
    div {
      display: grid;
    }
    `}</style>
    </div>
  )
}