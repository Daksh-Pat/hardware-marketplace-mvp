import './My_Messages.css';

function My_Messages({changeView}) {
  return (
    <div className="my-messages">
          <button className="my-messages-btn" onClick={() => changeView('my_messages')}>
            My Messages
          </button>
     </div>
  );
}

export default My_Messages;