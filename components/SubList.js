import EditText from '../components/EditText'
import Store from '../components/Store';
import { useContext } from 'react';

export default function SubList({onPlay, searchSrt, video}) {
const { srtObject } = useContext(Store);

  return (
    <ul className="srt_list">
      {srtObject.map((sub) => (
        <li key={sub.id}>
          <EditText searchSrt={searchSrt} sub={sub} onPlay={onPlay} video={video} />
          <button onClick={() => onPlay(sub.startTime)}>
            {sub.id}: {sub.startTime}
          </button>
        </li>
      ))}
    <style jsx scoped>{`
    .srt_list {
      width: 100%;
      height: 400px;
      overflow-y: scroll;
      .srt_container {
        display: flex;
        flex-direction: column;
      }
    }
    `}</style>
    </ul>
  )
}