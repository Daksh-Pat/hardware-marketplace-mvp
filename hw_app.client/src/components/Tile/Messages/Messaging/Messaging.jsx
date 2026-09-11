import './Messaging.css';
import Textbox from './Textbox/Textbox.jsx';
import Chat_History from './Chat_History/Chat_History.jsx';
import Item_Prompt from './Item_Prompt/Item_Prompt.jsx';

function Messaging({ messages, inputText, onChange, onSubmit, onDelete, listingId }) {
  return (
      <div className="messaging">
          <Item_Prompt onDelete={onDelete} listingId={listingId} />
          <Chat_History messages={messages} />
          <Textbox inputText={inputText} onChange={onChange} onSubmit={onSubmit} />
      </div>
  );
}

export default Messaging;