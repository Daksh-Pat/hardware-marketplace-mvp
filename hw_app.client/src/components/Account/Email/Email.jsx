import './Email.css';

function Email({email,setEmail}) {
  return (
      <div className="email">
          <p>Email:</p>
          <input
              type="email"
              className="email"
              placeholder="Enter Email"
              minLength="3"
              maxLength="30"
              value={email}
              onChange={e => setEmail(e.target.value)}
          />
      </div>
  );
}

export default Email;