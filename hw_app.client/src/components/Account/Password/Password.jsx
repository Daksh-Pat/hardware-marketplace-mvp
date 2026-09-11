import './Password.css';

function Password({password,setPassword}) {
  return (
      <div className="password">
          <p>Password:</p>
          <input
              className="password"
              type="password"
              placeholder="Enter password"
              minLength="3"
              maxLength="30"
              value={password}
              onChange={e => setPassword(e.target.value)}
          />
      </div>
  );
}

export default Password;