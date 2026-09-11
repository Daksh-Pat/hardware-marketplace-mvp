import './Username.css';

function Username({username,setUsername}) {
  return (
      <div className="username">
          <p>Username:</p>
          <input
              type="text"
              className="username"
              placeholder="Enter your username"
              minLength="3"
              maxLength="30"
              value={username}
              onChange={e => setUsername(e.target.value)}
          />
      </div>
  );
}

export default Username;