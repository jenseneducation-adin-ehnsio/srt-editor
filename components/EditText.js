import { useState, useEffect, useContext } from 'react';
import Store from '../components/Store';

export default function EditText({sub, searchSrt, onEdit, video}) {
  const [edit, setEdit] = useState(false);
  const [texts, setTexts] = useState();
  const { updateSrtObject } = useContext(Store);

  useEffect(() => {
    let srtArray = (sub.text.split('</i>'));
    if(srtArray.length > 1) {
      srtArray.pop();
    }
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
    if(video.current) {
      searchSrt();
    }
  }

  const toggleEdit = () => {
    setEdit(!edit);
    if(video.current) {
      video.current.pause();
      onEdit(sub.startTime);
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      toggleEdit();
    };
  }

  return (
    <div>
          {!edit ? (
            <div className="srt_container" dangerouslySetInnerHTML={{ __html: sub.text }}></div>
          ) : (
            texts.map((text, i) => (
              <input key={i} type="text" value={text} onKeyPress={e => handleKeyPress(e)} onChange={e => updateText(e.target.value, i)} />
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