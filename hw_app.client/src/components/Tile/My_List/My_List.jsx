import './My_List.css';
import Saved_List from './Saved_List/Saved_List.jsx';

function My_List() {
  return (
      <div className="my-list">
          <Saved_List />
      </div>
  );
}

export default My_List;