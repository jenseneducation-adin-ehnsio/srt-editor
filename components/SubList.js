import EditText from '../components/EditText'
import Store from '../components/Store';
import { useContext } from 'react';

export default function SubList({onPlay, searchSrt, video, onEdit}) {
  const { srtObject } = useContext(Store);
  const { currentId } = useContext(Store);

  return (
    <ul className="srt_list">
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
      height: calc(100vh - 320px);
      padding-bottom: 100px;
      overflow-y: scroll;
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